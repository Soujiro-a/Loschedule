import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Character } from 'src/character/schemas/character.schema';
import { mockRepository } from 'src/common/test.constants';
import { Team } from 'src/team/schemas/team.schema';
import { User } from 'src/user/schemas/user.schema';
import { RaidService } from './raid.service';
import { Raid } from './schemas/raid.schema';

describe('RaidService', () => {
  let service: RaidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RaidService,
        { provide: getModelToken(Raid.name), useValue: mockRepository },
        { provide: getModelToken(Team.name), useValue: mockRepository },
        { provide: getModelToken(User.name), useValue: mockRepository },
        { provide: getModelToken(Character.name), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<RaidService>(RaidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
