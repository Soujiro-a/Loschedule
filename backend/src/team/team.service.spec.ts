import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { mockRepository } from 'src/common/test.constants';
import { User } from 'src/user/schemas/user.schema';
import { Team } from './schemas/team.schema';
import { TeamService } from './team.service';

describe('TeamService', () => {
  let service: TeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamService,
        { provide: getModelToken(Team.name), useValue: mockRepository },
        { provide: getModelToken(User.name), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<TeamService>(TeamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
