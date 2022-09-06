import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import {
  mockRepository,
  TEST_KEY,
  mockJwtService,
  jwtSignedToken,
} from 'src/common/test.constants';
import { JwtService } from 'src/jwt/jwt.service';
import { CreateUserInput } from './dtos/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userModel: mockRepository<UserDocument>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getModelToken(User.name), useValue: mockRepository() },
        { provide: CONFIG_OPTIONS, useValue: { privateKey: TEST_KEY } },
        {
          provide: JwtService,
          useValue: mockJwtService(),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userModel = module.get(getModelToken(User.name));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findById', async () => {
    const userId = 'testId';
    const mockValue = {
      nickname: 'testUser',
      password: '1234',
    };
    userModel.findOne.mockResolvedValue(mockValue);

    const result = await service.findById(userId);

    expect(userModel.findOne).toHaveBeenCalledTimes(1);
    expect(userModel.findOne).toHaveBeenCalledWith({ _id: userId });

    expect(result).toMatchObject(mockValue);
  });

  it('findByNickname', async () => {
    const nickname = 'testUser';
    const mockValue = {
      nickname,
      password: '1234',
    };
    userModel.findOne.mockResolvedValue(mockValue);

    const result = await service.findByNickname(nickname);

    expect(userModel.findOne).toHaveBeenCalledTimes(1);
    expect(userModel.findOne).toHaveBeenCalledWith({ nickname });

    expect(result).toMatchObject(mockValue);
  });

  describe('create', () => {
    const createUserArgs: CreateUserInput = {
      nickname: 'testUser',
      password: '1234',
    };
    it('유저 생성 성공', async () => {
      userModel.create.mockResolvedValue(createUserArgs);
      userModel.findOne.mockResolvedValue(undefined);

      const result = await service.create(createUserArgs);

      expect(userModel.create).toHaveBeenCalledTimes(1);
      expect(userModel.create).toHaveBeenCalledWith(createUserArgs);

      expect(result).toMatchObject({ ok: true });
    });
    describe('유저 생성 실패', () => {
      it('닉네임 중복', async () => {
        userModel.findOne.mockResolvedValue(true);

        const result = await service.create(createUserArgs);

        expect(result).toMatchObject({
          ok: false,
          error: '이미 존재하는 닉네임입니다.',
        });
      });
      it('예기치 못한 오류', async () => {
        userModel.findOne.mockResolvedValue(undefined);
        userModel.create.mockRejectedValue(new Error());

        const result = await service.create(createUserArgs);

        expect(result).toMatchObject({
          ok: false,
          error: '유저를 생성하는데 실패하였습니다.',
        });
      });
    });
  });

  describe('login', () => {
    const loginUserArgs = {
      nickname: 'testUser',
      password: '1234',
    };
    it('로그인 성공', async () => {
      const mockedUser = {
        comparePassword: jest.fn(() => Promise.resolve(true)),
      };
      userModel.findOne.mockResolvedValue(mockedUser);

      const result = await service.login(loginUserArgs);

      expect(userModel.findOne).toHaveBeenCalledTimes(1);
      expect(mockedUser.comparePassword).toHaveBeenCalledTimes(1);
      expect(jwtService.sign).toHaveBeenCalledTimes(1);

      expect(result).toMatchObject({
        ok: true,
        token: jwtSignedToken,
      });
    });
    describe('로그인 실패', () => {
      const loginUserArgs = {
        nickname: 'testUser',
        password: '1234',
      };

      it('존재하지 않는 유저', async () => {
        userModel.findOne.mockResolvedValue(undefined);

        const result = await service.login(loginUserArgs);

        expect(userModel.findOne).toHaveBeenCalledTimes(1);

        expect(result).toMatchObject({
          ok: false,
          error: '존재하지 않는 유저입니다.',
        });
      });
      it('비밀번호 불일치', async () => {
        const mockedUser = {
          comparePassword: jest.fn(() => Promise.resolve(false)),
        };
        userModel.findOne.mockResolvedValue(mockedUser);

        const result = await service.login(loginUserArgs);

        expect(userModel.findOne).toHaveBeenCalledTimes(1);
        expect(mockedUser.comparePassword).toHaveBeenCalledTimes(1);

        expect(result).toMatchObject({
          ok: false,
          error: '비밀번호가 일치하지 않습니다.',
        });
      });
      it('예기치 못한 오류', async () => {
        userModel.findOne.mockResolvedValue(loginUserArgs);

        const result = await service.login(loginUserArgs);

        expect(result).toMatchObject({
          ok: false,
          error: '로그인에 실패하였습니다.',
        });
      });
    });
  });

  describe('getProfile', () => {
    const mockNickname = 'test';
    const mockUser = {
      nickname: mockNickname,
      characters: [],
      teams: [],
    };
    it('프로필 조회 성공', async () => {
      userModel.aggregate.mockResolvedValue([mockUser]);

      const result = await service.getProfile(mockNickname);

      expect(userModel.aggregate).toHaveBeenCalledTimes(1);

      expect(result).toMatchObject({
        ok: true,
        nickname: mockUser.nickname,
        characters: mockUser.characters,
        teams: mockUser.teams,
      });
    });
    it('프로필 조회 실패', async () => {
      userModel.aggregate.mockResolvedValue(undefined);

      const result = await service.getProfile(mockNickname);

      expect(result).toMatchObject({
        ok: false,
        error: '유저 정보를 불러오는데 실패하였습니다.',
      });
    });
  });

  describe('editProfile', () => {
    it('프로필 수정 성공', async () => {
      const user = new User();
      const editProfileArgs = {
        nickname: 'edit',
        password: '12345',
      };

      jest.spyOn(service, 'editProfile').mockImplementation(() =>
        Promise.resolve({
          ok: true,
        }),
      );

      const result = await service.editProfile(user, editProfileArgs);

      expect(result).toMatchObject({
        ok: true,
      });
    });
    describe('프로필 수정 실패', () => {
      it('존재하지 않는 유저', async () => {
        const user = new User();
        const editProfileArgs = {
          nickname: 'edit',
          password: '12345',
        };
        userModel.findOne.mockResolvedValue(undefined);

        const result = await service.editProfile(user, editProfileArgs);

        expect(result).toMatchObject({
          ok: false,
          error: '존재하지 않는 유저입니다.',
        });
      });
      it('같은 닉네임으로 변경 시도', async () => {
        const user = new User();
        const mockNickname = 'test';
        user.nickname = mockNickname;
        const editProfileArgs = {
          nickname: mockNickname,
          password: '12345',
        };
        userModel.findOne.mockResolvedValue(user);

        const result = await service.editProfile(user, editProfileArgs);

        expect(result).toMatchObject({
          ok: false,
          error: '같은 닉네임으로의 변경은 불가능합니다.',
        });
      });
      it('이미 존재하는 닉네임', async () => {
        const user = new User();
        user.nickname = 'test';
        const editProfileArgs = {
          nickname: 'edit',
          password: '12345',
        };
        userModel.findOne.mockResolvedValue(user);

        const result = await service.editProfile(user, editProfileArgs);

        expect(result).toMatchObject({
          ok: false,
          error: '이미 존재하는 닉네임입니다.',
        });
      });
      it('예기치 못한 오류', async () => {
        const user = new User();
        user.nickname = 'test';
        const editProfileArgs = {
          nickname: 'edit',
          password: '12345',
        };
        userModel.findOne.mockResolvedValueOnce(user);

        const result = await service.editProfile(user, editProfileArgs);

        expect(result).toMatchObject({
          ok: false,
          error: '유저 정보를 갱신하는데 실패하였습니다.',
        });
      });
    });
  });
});
