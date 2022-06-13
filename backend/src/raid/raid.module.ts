import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Character,
  CharacterSchema,
} from 'src/character/schemas/character.schema';
import { Team, TeamSchema } from 'src/team/schemas/team.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { RaidController } from './raid.controller';
import { RaidService } from './raid.service';
import { Raid, RaidSchema } from './schemas/raid.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          return UserSchema;
        },
      },
      {
        name: Raid.name,
        useFactory: () => {
          return RaidSchema;
        },
      },
      {
        name: Character.name,
        useFactory: () => {
          return CharacterSchema;
        },
      },
      {
        name: Team.name,
        useFactory: () => {
          return TeamSchema;
        },
      },
    ]),
  ],
  controllers: [RaidController],
  providers: [RaidService],
})
export class RaidModule {}
