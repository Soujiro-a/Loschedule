import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import {
  ChangeLeaderInput,
  ChangeLeaderOutput,
} from './dtos/change-leader.dto';
import { CreateTeamInput, CreateTeamOutput } from './dtos/create-team.dto';
import { DeleteTeamOutput } from './dtos/delete-team.dto';
import { GetMembersOutput } from './dtos/get-members.dto';
import { GetRaidsOutput } from './dtos/get-raids.dto';
import { JoinTeamOutput } from './dtos/join-team.dto';
import { LeaveTeamOutput } from './dtos/leave-team.dto';
import { Team, TeamDocument } from './schemas/team.schema';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name)
    private readonly teamModel: Model<TeamDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(
    { _id: userId }: User,
    { teamName }: CreateTeamInput,
  ): Promise<CreateTeamOutput> {
    try {
      const newTeam = new this.teamModel({
        name: teamName,
        leader: userId,
      });

      await Promise.all([
        newTeam.save(),
        this.userModel.updateOne(
          { _id: userId },
          {
            $push: {
              teams: newTeam._id,
            },
          },
        ),
      ]);

      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '팀 생성에 실패하였습니다.',
      };
    }
  }

  async delete(
    { _id: userId }: User,
    teamId: string,
  ): Promise<DeleteTeamOutput> {
    try {
      const findTeam = await this.teamModel.findOne({ _id: teamId }).lean();
      if (!findTeam) {
        return {
          ok: false,
          error: '존재하지 않는 팀입니다.',
        };
      }

      if (String(findTeam.leader) !== String(userId)) {
        return {
          ok: false,
          error: '팀 리더만 팀을 지울 수 있습니다.',
        };
      }

      await Promise.all([
        this.teamModel.deleteOne({ _id: teamId }),
        this.userModel.updateOne(
          { _id: userId },
          {
            $pull: {
              teams: findTeam._id,
            },
          },
        ),
      ]);

      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '팀 삭제에 실패하였습니다.',
      };
    }
  }

  async join({ _id: userId }: User, teamId: string): Promise<JoinTeamOutput> {
    try {
      const findTeam = await this.teamModel.findOne({ _id: teamId }).lean();
      if (!findTeam) {
        return {
          ok: false,
          error: '존재하지 않는 팀입니다.',
        };
      }

      if (
        String(findTeam.leader) === String(userId) ||
        findTeam.members.find((memberId) => String(memberId) === String(userId))
      ) {
        return {
          ok: false,
          error: '이미 소속되어있는 팀 입니다.',
        };
      }

      await Promise.all([
        this.teamModel.updateOne(
          { _id: teamId },
          {
            $push: {
              members: userId,
            },
          },
        ),
        this.userModel.updateOne(
          { _id: userId },
          {
            $push: {
              teams: findTeam._id,
            },
          },
        ),
      ]);

      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '팀에 합류하는데 실패하였습니다.',
      };
    }
  }

  async leave({ _id: userId }: User, teamId: string): Promise<LeaveTeamOutput> {
    try {
      const findTeam = await this.teamModel.findOne({ _id: teamId }).lean();
      if (!findTeam) {
        return {
          ok: false,
          error: '존재하지 않는 팀입니다.',
        };
      }

      if (
        findTeam.members.find((memberId) => String(memberId) === String(userId))
      ) {
        await this.teamModel.updateOne(
          { _id: teamId },
          {
            $pull: {
              members: userId,
            },
          },
        );
        return {
          ok: true,
        };
      } else if (String(findTeam.leader) === String(userId)) {
        return {
          ok: false,
          error: '팀 리더는 팀을 해체하는 것만 가능합니다.',
        };
      } else {
        return {
          ok: false,
          error: '해당 팀에 소속되어있지 않습니다.',
        };
      }
    } catch {
      return {
        ok: false,
        error: '팀에서 탈퇴하는데 실패하였습니다.',
      };
    }
  }

  async changeLeader(
    { _id: userId }: User,
    teamId: string,
    { newLeaderId }: ChangeLeaderInput,
  ): Promise<ChangeLeaderOutput> {
    try {
      const findTeam = await this.teamModel.findOne({ _id: teamId }).lean();
      if (!findTeam) {
        return {
          ok: false,
          error: '존재하지 않는 팀입니다.',
        };
      }

      if (String(findTeam.leader) !== String(userId)) {
        return {
          ok: false,
          error: '현재 팀 리더만 새 리더로 교체할 수 있습니다.',
        };
      }

      if (
        findTeam.members.find(
          (memberId) => String(memberId) === String(newLeaderId),
        )
      ) {
        const leaderId = new mongoose.Types.ObjectId(newLeaderId);
        await Promise.all([
          this.teamModel.updateOne(
            { _id: teamId },
            {
              $set: { leader: leaderId },
              $pull: { members: leaderId },
            },
          ),
          this.teamModel.updateOne(
            { _id: teamId },
            {
              $push: { members: userId },
            },
          ),
        ]);

        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: '팀 멤버가 아닌 사람을 리더로 교체할 수 없습니다.',
        };
      }
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: '팀 리더 교체에 실패하였습니다.',
      };
    }
  }

  async getRaids(
    { _id: userId }: User,
    teamId: string,
  ): Promise<GetRaidsOutput> {
    try {
      const findTeam = await this.teamModel.findOne({ _id: teamId }).lean();
      if (!findTeam) {
        return {
          ok: false,
          error: '존재하지 않는 팀입니다.',
        };
      }

      if (
        String(findTeam.leader) === String(userId) ||
        findTeam.members.find((memberId) => String(memberId) === String(userId))
      ) {
        const [findRaids] = await this.teamModel.aggregate([
          {
            $match: {
              _id: new mongoose.Types.ObjectId(teamId),
            },
          },
          {
            $lookup: {
              from: 'raids',
              localField: 'raids',
              foreignField: '_id',
              as: 'raidsInfo',
            },
          },
          {
            $project: {
              raids: '$raidsInfo',
            },
          },
        ]);
        return {
          ok: true,
          raids: findRaids.raids,
        };
      } else {
        return {
          ok: false,
          error: '팀에 속해있는 멤버들만 조회가 가능한 정보입니다.',
        };
      }
    } catch {
      return {
        ok: false,
        error: '레이드 정보들을 불러올 수 없습니다.',
      };
    }
  }

  async getMembers(
    { _id: userId }: User,
    teamId: string,
  ): Promise<GetMembersOutput> {
    try {
      const findTeam = await this.teamModel.findOne({ _id: teamId }).lean();
      if (!findTeam) {
        return {
          ok: false,
          error: '존재하지 않는 팀입니다.',
        };
      }

      if (
        String(findTeam.leader) === String(userId) ||
        findTeam.members.find((memberId) => String(memberId) === String(userId))
      ) {
        const [findMembers] = await this.teamModel.aggregate([
          {
            $match: {
              _id: new mongoose.Types.ObjectId(teamId),
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: 'leader',
              foreignField: '_id',
              as: 'leaderInfo',
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: 'members',
              foreignField: '_id',
              as: 'membersInfo',
            },
          },
          {
            $project: {
              members: '$membersInfo',
              leader: '$leaderInfo',
            },
          },
        ]);
        return {
          ok: true,
          leader: findMembers.leader,
          members: findMembers.members,
        };
      } else {
        return {
          ok: false,
          error: '팀에 속해있는 멤버들만 조회가 가능한 정보입니다.',
        };
      }
    } catch {
      return {
        ok: false,
        error: '팀 멤버 정보들을 불러올 수 없습니다.',
      };
    }
  }
}
