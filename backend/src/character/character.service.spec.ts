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

  describe('create', () => {
    it.todo('캐릭터 등록 성공');
    describe('캐릭터 등록 실패', () => {
      it.todo('이미 등록되어있는 캐릭터');
      it.todo('예기치 못한 오류');
    });
  });

  describe('delete', () => {
    it.todo('캐릭터 삭제 성공');
    describe('캐릭터 삭제 실패', () => {
      it.todo('등록되어있지 않은 캐릭터');
      it.todo('예기치 못한 오류');
    });
  });

  describe('update', () => {
    it.todo('캐릭터 정보 갱신 성공');
    describe('캐릭터 정보 갱신 실패', () => {
      it.todo('등록되어있지 않은 캐릭터');
      it.todo('예기치 못한 오류');
    });
  });

  describe('search', () => {
    it.todo('캐릭터 검색 성공');
    describe('캐릭터 검색 실패', () => {
      it.todo('예기치 못한 오류');
    });
  });
});
