import { HttpModule } from '@nestjs/axios';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { mockRepository } from 'src/common/test.constants';
import { CrawlerService } from 'src/crawler/crawler.service';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { CharacterService } from './character.service';
import { Character, CharacterDocument } from './schemas/character.schema';

describe('CharacterService', () => {
  let service: CharacterService;
  let userModel: mockRepository<UserDocument>;
  let characterModel: mockRepository<CharacterDocument>;
  let user: User;

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
    userModel = module.get(getModelToken(User.name));
    characterModel = module.get(getModelToken(Character.name));
    user = new User();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it.todo('캐릭터 등록 성공');
    describe('캐릭터 등록 실패', () => {
      it.todo('이미 등록되어있는 캐릭터');
      it('예기치 못한 오류', async () => {
        const mockCreateArgs = {
          characterName: 'test',
        };

        const result = await service.create(user, mockCreateArgs);

        expect(result).toMatchObject({
          ok: false,
          error: '캐릭터를 추가하는데 실패하였습니다.',
        });
      });
    });
  });

  describe('delete', () => {
    it.todo('캐릭터 삭제 성공');
    describe('캐릭터 삭제 실패', () => {
      it.todo('등록되어있지 않은 캐릭터');
      it('예기치 못한 오류', async () => {
        const mockDeleteArgs = {
          characterName: 'test',
        };

        const result = await service.delete(user, mockDeleteArgs);

        expect(result).toMatchObject({
          ok: false,
          error: '캐릭터를 삭제하는데 실패하였습니다.',
        });
      });
    });
  });

  describe('update', () => {
    it.todo('캐릭터 정보 갱신 성공');
    describe('캐릭터 정보 갱신 실패', () => {
      it.todo('등록되어있지 않은 캐릭터');
      it('예기치 못한 오류', async () => {
        const mockUpdateArgs = {
          characterName: 'test',
        };

        const result = await service.update(mockUpdateArgs);

        expect(result).toMatchObject({
          ok: false,
          error: '캐릭터 정보 갱신에 실패하였습니다.',
        });
      });
    });
  });

  describe('search', () => {
    it.todo('캐릭터 검색 성공');
    describe('캐릭터 검색 실패', () => {
      it.todo('예기치 못한 오류');
    });
  });
});
