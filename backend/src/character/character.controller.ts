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
import { CharacterService } from './character.service';
import {
  CreateCharacterInput,
  CreateCharacterOutput,
} from './dtos/create-character.dto';
import {
  DeleteCharacterInput,
  DeleteCharacterOutput,
} from './dtos/delete-character.dto';
import { SearchCharacterOutput } from './dtos/search-character.dto';
import {
  UpdateCharacterInput,
  UpdateCharacterOutput,
} from './dtos/update-character.dto';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  @Role(['any'])
  create(
    @AuthUser() user: User,
    @Body() createCharacterInput: CreateCharacterInput,
  ): Promise<CreateCharacterOutput> {
    return this.characterService.create(user, createCharacterInput);
  }

  @Delete()
  @Role(['any'])
  delete(
    @AuthUser() user: User,
    @Body() deleteCharacterInput: DeleteCharacterInput,
  ): Promise<DeleteCharacterOutput> {
    return this.characterService.delete(user, deleteCharacterInput);
  }

  @Patch()
  @Role(['any'])
  update(
    @Body() updateCharacterInput: UpdateCharacterInput,
  ): Promise<UpdateCharacterOutput> {
    return this.characterService.update(updateCharacterInput);
  }

  @Get(':name')
  search(@Param('name') characterName: string): Promise<SearchCharacterOutput> {
    return this.characterService.search(characterName);
  }
}
