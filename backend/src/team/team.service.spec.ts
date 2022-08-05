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

  describe('create', () => {
    it.todo('팀 생성 성공');
    describe('팀 생성 실패', () => {
      it.todo('예기치 못한 오류');
    });
  });

  describe('delete', () => {
    it.todo('팀 삭제 성공');
    describe('팀 삭제 실패', () => {
      it.todo('존재하지 않는 팀');
      it.todo('팀 삭제를 시도한 사람이 팀 리더가 아님');
      it.todo('예기치 못한 오류');
    });
  });

  describe('join', () => {
    it.todo('팀 가입 성공');
    describe('팀 가입 실패', () => {
      it.todo('존재하지 않는 팀');
      it.todo('이미 소속되어있는 팀');
      it.todo('예기치 못한 오류');
    });
  });

  describe('leave', () => {
    it.todo('팀 탈퇴 성공');
    describe('팀 탈퇴 실패', () => {
      it.todo('존재하지 않는 팀');
      it.todo('팀 리더일 경우(팀 해체만 가능)');
      it.todo('소속되어있지 않은 팀에 대한 탈퇴 요청');
      it.todo('예기치 못한 오류');
    });
  });

  describe('changeLeader', () => {
    it.todo('팀 리더 변경 성공');
    describe('팀 리더 변경 실패', () => {
      it.todo('존재하지 않는 팀');
      it.todo('팀 리더 변경을 시도한 사람이 팀 리더가 아님');
      it.todo('팀 멤버가 아닌 사람에게 팀 리더를 주려고 함');
      it.todo('예기치 못한 오류');
    });
  });

  describe('getRaids', () => {
    it.todo('팀 내 레이드 일정 정보 조회 성공');
    describe('팀 내 레이드 일정 정보 조회 실패', () => {
      it.todo('존재하지 않는 팀');
      it.todo('팀 멤버가 아닌 경우');
      it.todo('예기치 못한 오류');
    });
  });

  describe('getMembers', () => {
    it.todo('팀 내 멤버 정보 조회 성공');
    describe('팀 내 멤버 정보 조회 실패', () => {
      it.todo('존재하지 않는 팀');
      it.todo('팀 멤버가 아닌 경우');
      it.todo('예기치 못한 오류');
    });
  });
});
