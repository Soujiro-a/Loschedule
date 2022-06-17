import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character } from 'src/character/schemas/character.schema';
import { Team } from 'src/team/schemas/team.schema';
import { User } from 'src/user/schemas/user.schema';
import { CreateRaidInput, CreateRaidOutput } from './dtos/create-raid.dto';
import { DeleteRaidInput, DeleteRaidOutput } from './dtos/delete-raid.dto';
import { EditRaidInput, EditRaidOutput } from './dtos/edit-raid.dto';
import { GetRaidInput, GetRaidOutput } from './dtos/get-raid.dto';
import { Raid } from './schemas/raid.schema';

@Injectable()
export class RaidService {
  constructor(
    @InjectModel(Raid.name) private readonly raidModel: Model<Raid>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Character.name)
    private readonly characterModel: Model<Character>,
    @InjectModel(Team.name)
    private readonly teamModel: Model<Team>,
  ) {}

  async create(
    { _id: userId }: User,
    { bossName, targetDate, teamId, characters }: CreateRaidInput,
  ): Promise<CreateRaidOutput> {
    try {
      let charactersInfo;
      if (characters) {
        charactersInfo = await Promise.all(
          characters.map(async (characterName) => {
            const character = await this.characterModel
              .findOne({
                name: characterName,
              })
              .lean();

            if (!character) {
              throw new Error(
                `${characterName} 캐릭터 정보가 존재하지 않습니다.`,
              );
            }
            return character;
          }),
        );
      }
      const newRaid = new this.raidModel({
        bossName,
        targetDate,
        leader: userId,
        characters: charactersInfo,
      });
      await Promise.all([
        newRaid.save(),
        this.teamModel.updateOne(
          { _id: teamId },
          {
            $push: {
              raids: newRaid._id,
            },
          },
        ),
      ]);

      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: e.message || '일정을 추가하는데 실패하였습니다.',
      };
    }
  }

  async delete(
    { _id: userId }: User,
    { teamId, raidId }: DeleteRaidInput,
  ): Promise<DeleteRaidOutput> {
    try {
      const findRaid = await this.raidModel.findOne({ _id: raidId }).lean();
      if (!findRaid) {
        return {
          ok: false,
          error: '존재하지 않는 일정입니다.',
        };
      }

      if (String(findRaid.leader) !== String(userId)) {
        return {
          ok: false,
          error: '일정을 추가한 사람만 삭제할 수 있습니다.',
        };
      }

      await Promise.all([
        this.raidModel.deleteOne({ _id: raidId }),
        this.teamModel.updateOne(
          { _id: teamId },
          {
            $pull: {
              raids: raidId,
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
        error: '일정 삭제에 실패하였습니다.',
      };
    }
  }

  async edit(
    { _id: userId }: User,
    { raidId, bossName, targetDate, characters }: EditRaidInput,
  ): Promise<EditRaidOutput> {
    try {
      const findRaid = await this.raidModel.findOne({ _id: raidId });
      if (!findRaid) {
        return {
          ok: false,
          error: '존재하지 않는 일정입니다.',
        };
      }

      if (String(findRaid.leader) !== String(userId)) {
        return {
          ok: false,
          error: '일정을 추가한 사람만 수정할 수 있습니다.',
        };
      }

      if (bossName) {
        findRaid.bossName = bossName;
      }

      if (targetDate) {
        findRaid.targetDate = targetDate;
      }

      let charactersId;
      if (characters) {
        charactersId = await Promise.all(
          characters.map(async (characterName) => {
            const character = await this.characterModel.findOne({
              name: characterName,
            });

            if (!character) {
              throw new Error(
                `${characterName} 캐릭터 정보가 존재하지 않습니다.`,
              );
            }
            return character._id;
          }),
        );

        findRaid.characters = charactersId;
      }

      await findRaid.save();

      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: e.message || '일정 수정에 실패하였습니다.',
      };
    }
  }

  async get(
    { _id: userId }: User,
    raidId: string,
    { teamId }: GetRaidInput,
  ): Promise<GetRaidOutput> {
    try {
      const findRaid = await this.raidModel.findOne({ _id: raidId }).lean();
      if (!findRaid) {
        return {
          ok: false,
          error: '존재하지 않는 일정입니다.',
        };
      }

      const findTeam = await this.teamModel.findOne({ _id: teamId }).lean();
      if (!findTeam) {
        return {
          ok: false,
          error: '존재하지 않는 팀입니다.',
        };
      }

      if (!findTeam.raids.find((teamraidId) => String(teamraidId) === raidId)) {
        return {
          ok: false,
          error: '해당 팀이 가지고 있는 레이드 정보만 조회할 수 있습니다.',
        };
      }

      if (
        String(findTeam.leader) === String(userId) ||
        findTeam.members.find((memberId) => String(memberId) === String(userId))
      ) {
        return {
          ok: true,
          characters: findRaid.characters,
          bossName: findRaid.bossName,
          targetDate: findRaid.targetDate,
        };
      } else {
        return {
          ok: false,
          error: '팀에 속해있는 멤버들만 조회가 가능한 정보입니다.',
        };
      }

      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '레이드 정보 조회에 실패하였습니다.',
      };
    }
  }
}
