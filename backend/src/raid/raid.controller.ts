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
import { CreateRaidInput, CreateRaidOutput } from './dtos/create-raid.dto';
import { DeleteRaidInput, DeleteRaidOutput } from './dtos/delete-raid.dto';
import { EditRaidInput, EditRaidOutput } from './dtos/edit-raid.dto';
import { GetRaidInput, GetRaidOutput } from './dtos/get-raid.dto';
import { RaidService } from './raid.service';

@Controller('raid')
export class RaidController {
  constructor(private readonly raidService: RaidService) {}

  @Post()
  @Role(['any'])
  create(
    @AuthUser() user: User,
    @Body() createRaidInput: CreateRaidInput,
  ): Promise<CreateRaidOutput> {
    return this.raidService.create(user, createRaidInput);
  }

  @Delete(':id')
  @Role(['any'])
  delete(
    @AuthUser() user: User,
    @Param('id') raidId: string,
    @Body() deleteRaidInput: DeleteRaidInput,
  ): Promise<DeleteRaidOutput> {
    return this.raidService.delete(user, raidId, deleteRaidInput);
  }

  @Patch(':id')
  @Role(['any'])
  edit(
    @AuthUser() user: User,
    @Param('id') raidId: string,
    @Body() editRaidInput: EditRaidInput,
  ): Promise<EditRaidOutput> {
    return this.raidService.edit(user, raidId, editRaidInput);
  }

  @Get(':id')
  @Role(['any'])
  get(
    @AuthUser() user: User,
    @Param('id') raidId: string,
    @Body() getRaidInput: GetRaidInput,
  ): Promise<GetRaidOutput> {
    return this.raidService.get(user, raidId, getRaidInput);
  }
}
