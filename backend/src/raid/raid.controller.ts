import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/user/schemas/user.schema';
import { CreateRaidInput, CreateRaidOutput } from './dtos/create-raid.dto';
import { DeleteRaidInput, DeleteRaidOutput } from './dtos/delete-raid.dto';
import { EditRaidInput, EditRaidOutput } from './dtos/edit-raid.dto';
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

  @Delete()
  @Role(['any'])
  delete(
    @AuthUser() user: User,
    @Body() deleteRaidInput: DeleteRaidInput,
  ): Promise<DeleteRaidOutput> {
    return this.raidService.delete(user, deleteRaidInput);
  }

  @Patch()
  @Role(['any'])
  edit(
    @AuthUser() user: User,
    @Body() editRaidInput: EditRaidInput,
  ): Promise<EditRaidOutput> {
    return this.raidService.edit(user, editRaidInput);
  }
}
