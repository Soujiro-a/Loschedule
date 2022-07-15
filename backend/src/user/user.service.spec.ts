import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { mockRepository, TEST_KEY } from 'src/common/test.constants';
import { JwtService } from 'src/jwt/jwt.service';
import { CreateUserInput } from './dtos/create-user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userModel: mockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getModelToken(User.name), useValue: mockRepository() },
        { provide: CONFIG_OPTIONS, useValue: { privateKey: TEST_KEY } },
        JwtService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userModel = module.get(getModelToken(User.name));
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
});
