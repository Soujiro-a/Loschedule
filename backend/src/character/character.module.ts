import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { Character, CharacterSchema } from './schemas/character.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Character.name,
        useFactory: () => {
          return CharacterSchema;
        },
      },
      {
        name: User.name,
        useFactory: () => {
          return UserSchema;
        },
      },
    ]),
  ],
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule {}
