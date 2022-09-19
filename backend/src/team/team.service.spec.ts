import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { mockRepository } from 'src/common/test.constants';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { CreateTeamInput } from './dtos/create-team.dto';
import { Team, TeamDocument } from './schemas/team.schema';
import { TeamService } from './team.service';

describe('TeamService', () => {
  let service: TeamService;
  let userModel: mockRepository<UserDocument>;
  let teamModel: mockRepository<TeamDocument>;
  let user: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamService,
        { provide: getModelToken(Team.name), useValue: mockRepository() },
        { provide: getModelToken(User.name), useValue: mockRepository() },
      ],
    }).compile();

    service = module.get<TeamService>(TeamService);
    userModel = module.get(getModelToken(User.name));
    teamModel = module.get(getModelToken(Team.name));
    user = new User();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('팀 생성 성공', async () => {
      const createTeamArgs: CreateTeamInput = {
        teamName: 'test',
      };

      jest.spyOn(service, 'create').mockImplementation(() =>
        Promise.resolve({
          ok: true,
        }),
      );

      const result = await service.create(user, createTeamArgs);

      expect(result).toMatchObject({
        ok: true,
      });
    });
    describe('팀 생성 실패', () => {
      it('예기치 못한 오류', async () => {
        const createTeamArgs: CreateTeamInput = {
          teamName: 'test',
        };
        const result = await service.create(user, createTeamArgs);

        expect(result).toMatchObject({
          ok: false,
          error: '팀 생성에 실패하였습니다.',
        });
      });
    });
  });

  describe('delete', () => {
    it.todo('팀 삭제 성공');
    describe('팀 삭제 실패', () => {
      const mockTeamId = 'test';
      it.todo('존재하지 않는 팀');
      it.todo('팀 삭제를 시도한 사람이 팀 리더가 아님');
      it('예기치 못한 오류', async () => {
        const result = await service.delete(user, mockTeamId);

        expect(result).toMatchObject({
          ok: false,
          error: '팀 삭제에 실패하였습니다.',
        });
      });
    });
  });

  describe('join', () => {
    it.todo('팀 가입 성공');
    describe('팀 가입 실패', () => {
      const mockTeamId = 'test';
      it.todo('존재하지 않는 팀');
      it.todo('이미 소속되어있는 팀');
      it('예기치 못한 오류', async () => {
        const result = await service.join(user, mockTeamId);

        expect(result).toMatchObject({
          ok: false,
          error: '팀에 합류하는데 실패하였습니다.',
        });
      });
    });
  });

  describe('leave', () => {
    it.todo('팀 탈퇴 성공');
    describe('팀 탈퇴 실패', () => {
      const mockTeamId = 'test';
      it.todo('존재하지 않는 팀');
      it.todo('팀 리더일 경우(팀 해체만 가능)');
      it.todo('소속되어있지 않은 팀에 대한 탈퇴 요청');
      it('예기치 못한 오류', async () => {
        const result = await service.leave(user, mockTeamId);

        expect(result).toMatchObject({
          ok: false,
          error: '팀에서 탈퇴하는데 실패하였습니다.',
        });
      });
    });
  });

  describe('changeLeader', () => {
    it.todo('팀 리더 변경 성공');
    describe('팀 리더 변경 실패', () => {
      const mockTeamId = 'test';
      it.todo('존재하지 않는 팀');
      it.todo('팀 리더 변경을 시도한 사람이 팀 리더가 아님');
      it.todo('팀 멤버가 아닌 사람에게 팀 리더를 주려고 함');
      it('예기치 못한 오류', async () => {
        const changeLeaderArgs = {
          newLeaderId: 'new',
        };
        const result = await service.changeLeader(
          user,
          mockTeamId,
          changeLeaderArgs,
        );

        expect(result).toMatchObject({
          ok: false,
          error: '팀 리더 교체에 실패하였습니다.',
        });
      });
    });
  });

  describe('getRaids', () => {
    it.todo('팀 내 레이드 일정 정보 조회 성공');
    describe('팀 내 레이드 일정 정보 조회 실패', () => {
      const mockTeamId = 'test';
      it.todo('존재하지 않는 팀');
      it.todo('팀 멤버가 아닌 경우');
      it('예기치 못한 오류', async () => {
        const result = await service.getRaids(user, mockTeamId);

        expect(result).toMatchObject({
          ok: false,
          error: '레이드 정보들을 불러올 수 없습니다.',
        });
      });
    });
  });

  describe('getMembers', () => {
    it.todo('팀 내 멤버 정보 조회 성공');
    describe('팀 내 멤버 정보 조회 실패', () => {
      const mockTeamId = 'test';
      it.todo('존재하지 않는 팀');
      it.todo('팀 멤버가 아닌 경우');
      it('예기치 못한 오류', async () => {
        const result = await service.getMembers(user, mockTeamId);

        expect(result).toMatchObject({
          ok: false,
          error: '팀 멤버 정보들을 불러올 수 없습니다.',
        });
      });
    });
  });
});
