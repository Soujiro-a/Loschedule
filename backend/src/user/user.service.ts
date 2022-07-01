import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from 'src/jwt/jwt.service';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { EditUserInput, EditUserOutput } from './dtos/edit-user.dto';
import { searchNicknameOutput } from './dtos/search-by-nickname.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { UserProfileOutput } from './dtos/user-profile.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<CreateUserOutput> {
    try {
      const findUser = await this.findByNickname(createUserInput.nickname);
      if (findUser) {
        return {
          ok: false,
          error: '이미 존재하는 닉네임입니다.',
        };
      }
      const createdUser = new this.userModel(createUserInput);
      await createdUser.save();
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '유저를 생성하는데 실패하였습니다.',
      };
    }
  }

  async login({ nickname, password }: LoginInput): Promise<LoginOutput> {
    try {
      const findUser = await this.findByNickname(nickname);
      if (!findUser) {
        return {
          ok: false,
          error: '존재하지 않는 유저입니다.',
        };
      }

      const isCorrectPassword = await findUser.comparePassword(password);
      if (!isCorrectPassword) {
        return {
          ok: false,
          error: '비밀번호가 일치하지 않습니다.',
        };
      }
      const token = this.jwtService.sign({ id: findUser._id });
      return {
        ok: true,
        token,
      };
    } catch {
      return {
        ok: false,
        error: '로그인에 실패하였습니다.',
      };
    }
  }

  async getProfile(nickname: string): Promise<UserProfileOutput> {
    try {
      const [findUser] = await this.userModel.aggregate([
        {
          $match: {
            nickname,
          },
        },
        {
          $lookup: {
            from: 'characters',
            localField: 'characters',
            foreignField: '_id',
            as: 'charactersInfo',
          },
        },
        {
          $lookup: {
            from: 'teams',
            localField: 'teams',
            foreignField: '_id',
            as: 'teamsInfo',
          },
        },
        {
          $project: {
            nickname: 1,
            role: 1,
            characters: '$charactersInfo',
            teams: '$teamsInfo',
          },
        },
      ]);

      return {
        ok: true,
        nickname,
        characters: findUser.characters,
        teams: findUser.teams,
      };
    } catch {
      return {
        ok: false,
        error: '유저 정보를 불러오는데 실패하였습니다.',
      };
    }
  }

  async editProfile(
    { _id: userId }: User,
    { nickname, password }: EditUserInput,
  ): Promise<EditUserOutput> {
    try {
      const findUserById = await this.findById(String(userId));
      if (!findUserById) {
        return {
          ok: false,
          error: '존재하지 않는 유저입니다.',
        };
      }

      if (nickname) {
        if (findUserById.nickname === nickname) {
          return {
            ok: false,
            error: '같은 닉네임으로의 변경은 불가능합니다.',
          };
        }
        const findUserByNickname = await this.findByNickname(nickname);
        if (findUserByNickname) {
          return {
            ok: false,
            error: '이미 존재하는 닉네임입니다.',
          };
        }
        findUserById.nickname = nickname;
      }

      if (password) {
        findUserById.password = password;
      }

      await findUserById.save();

      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '유저 정보를 갱신하는데 실패하였습니다.',
      };
    }
  }

  async findById(userId: string): Promise<User> {
    return this.userModel.findOne({ _id: userId });
  }

  async findByNickname(nickname: string): Promise<User> {
    return this.userModel.findOne({ nickname });
  }

  async searchNickname(nickname: string): Promise<searchNicknameOutput> {
    try {
      const findUserByNickname = await this.findByNickname(nickname);

      if (!findUserByNickname) {
        return {
          ok: false,
          error: '이미 존재하는 닉네임입니다.',
        };
      }

      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '유저 검색에 실패하였습니다.',
      };
    }
  }
}
