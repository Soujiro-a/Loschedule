import { HttpModule } from '@nestjs/axios';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { mockRepository } from 'src/common/test.constants';
import { CrawlerService } from 'src/crawler/crawler.service';
import { User } from 'src/user/schemas/user.schema';
import { CharacterService } from './character.service';
import { Character } from './schemas/character.schema';

describe('CharacterService', () => {
  let service: CharacterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        CharacterService,
        CrawlerService,
        { provide: getModelToken(User.name), useValue: mockRepository },
        { provide: getModelToken(Character.name), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<CharacterService>(CharacterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
