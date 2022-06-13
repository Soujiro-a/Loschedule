import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/user/schemas/user.schema';
import {
  ChangeLeaderInput,
  ChangeLeaderOutput,
} from './dtos/change-leader.dto';
import { CreateTeamInput, CreateTeamOutput } from './dtos/create-team.dto';
import { DeleteTeamInput, DeleteTeamOutput } from './dtos/delete-team.dto';
import { GetMembersInput, GetMembersOutput } from './dtos/get-members.dto';
import { GetRaidsInput, GetRaidsOutput } from './dtos/get-raids.dto';
import { JoinTeamInput, JoinTeamOutput } from './dtos/join-team.dto';
import { LeaveTeamInput, LeaveTeamOutput } from './dtos/leave-team.dto';
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

  @Delete()
  @Role(['any'])
  delete(
    @AuthUser() user: User,
    @Body() deleteTeamInput: DeleteTeamInput,
  ): Promise<DeleteTeamOutput> {
    return this.teamService.delete(user, deleteTeamInput);
  }

  @Post('/join')
  @Role(['any'])
  join(
    @AuthUser() user: User,
    @Body() joinTeamInput: JoinTeamInput,
  ): Promise<JoinTeamOutput> {
    return this.teamService.join(user, joinTeamInput);
  }

  @Post('/leave')
  @Role(['any'])
  leave(
    @AuthUser() user: User,
    @Body() leaveTeamInput: LeaveTeamInput,
  ): Promise<LeaveTeamOutput> {
    return this.teamService.leave(user, leaveTeamInput);
  }

  @Patch('/leader')
  @Role(['any'])
  changeLeader(
    @AuthUser() user: User,
    @Body() changeLeaderInput: ChangeLeaderInput,
  ): Promise<ChangeLeaderOutput> {
    return this.teamService.changeLeader(user, changeLeaderInput);
  }

  @Get('/members')
  @Role(['any'])
  getMembers(
    @AuthUser() user: User,
    @Body() getMembersInput: GetMembersInput,
  ): Promise<GetMembersOutput> {
    return this.teamService.getMembers(user, getMembersInput);
  }

  @Get('/raids')
  @Role(['any'])
  getRaids(
    @AuthUser() user: User,
    @Body() getRaidsInput: GetRaidsInput,
  ): Promise<GetRaidsOutput> {
    return this.teamService.getRaids(user, getRaidsInput);
  }
}
