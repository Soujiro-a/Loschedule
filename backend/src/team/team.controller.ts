import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/user/schemas/user.schema';
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
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @Role(['any'])
  create(
    @AuthUser() user: User,
    @Body() createTeamInput: CreateTeamInput,
  ): Promise<CreateTeamOutput> {
    return this.teamService.create(user, createTeamInput);
  }

  @Delete(':id')
  @Role(['any'])
  delete(
    @AuthUser() user: User,
    @Param('id') teamId: string,
  ): Promise<DeleteTeamOutput> {
    return this.teamService.delete(user, teamId);
  }

  @Post(':id/join')
  @Role(['any'])
  join(
    @AuthUser() user: User,
    @Param('id') teamId: string,
  ): Promise<JoinTeamOutput> {
    return this.teamService.join(user, teamId);
  }

  @Post(':id/leave')
  @Role(['any'])
  leave(
    @AuthUser() user: User,
    @Param('id') teamId: string,
  ): Promise<LeaveTeamOutput> {
    return this.teamService.leave(user, teamId);
  }

  @Patch(':id/leader')
  @Role(['any'])
  changeLeader(
    @AuthUser() user: User,
    @Param('id') teamId: string,
    @Body() changeLeaderInput: ChangeLeaderInput,
  ): Promise<ChangeLeaderOutput> {
    return this.teamService.changeLeader(user, teamId, changeLeaderInput);
  }

  @Get(':id/members')
  @Role(['any'])
  getMembers(
    @AuthUser() user: User,
    @Param('id') teamId: string,
  ): Promise<GetMembersOutput> {
    return this.teamService.getMembers(user, teamId);
  }

  @Get(':id/raids')
  @Role(['any'])
  getRaids(
    @AuthUser() user: User,
    @Param('id') teamId: string,
  ): Promise<GetRaidsOutput> {
    return this.teamService.getRaids(user, teamId);
  }
}
