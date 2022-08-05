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

  describe('create', () => {
    it.todo('레이드 일정 추가 성공');
    describe('레이드 일정 추가 실패', () => {
      it.todo('잘못된 캐릭터 정보 입력');
      it.todo('예기치 못한 오류');
    });
  });

  describe('delete', () => {
    it.todo('레이드 일정 삭제 성공');
    describe('레이드 일정 삭제 실패', () => {
      it.todo('존재하지 않는 레이드 일정');
      it.todo('일정을 추가한 사람과 삭제하려는 사람이 다름');
      it.todo('예기치 못한 오류');
    });
  });

  describe('edit', () => {
    it.todo('레이드 일정 수정 성공');
    describe('레이드 일정 수정 실패', () => {
      it.todo('존재하지 않는 레이드 일정');
      it.todo('일정을 추가한 사람과 수정하려는 사람이 다름');
      it.todo('예기치 못한 오류');
    });
  });

  describe('get', () => {
    it.todo('레이드 일정 조회 성공');
    describe('레이드 일정 조회 실패', () => {
      it.todo('존재하지 않는 레이드 일정');
      it.todo('존재하지 않는 팀');
      it.todo('해당 팀이 가지고 있는 레이드 일정이 아님');
      it.todo('레이드 일정을 가지고 있는 팀의 멤버가 아님');
      it.todo('예기치 못한 오류');
    });
  });
});
