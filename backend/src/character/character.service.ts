import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrawlerService } from 'src/crawler/crawler.service';
import { User } from 'src/user/schemas/user.schema';
import {
  CreateCharacterInput,
  CreateCharacterOutput,
} from './dtos/create-character.dto';
import {
  DeleteCharacterInput,
  DeleteCharacterOutput,
} from './dtos/delete-character.dto';
import { SearchCharacterOutput } from './dtos/search-character.dto';
import {
  UpdateCharacterInput,
  UpdateCharacterOutput,
} from './dtos/update-character.dto';
import { Character } from './schemas/character.schema';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name)
    private readonly characterModel: Model<Character>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly crawlerService: CrawlerService,
  ) {}

  async create(
    { _id: userId }: User,
    { characterName }: CreateCharacterInput,
  ): Promise<CreateCharacterOutput> {
    try {
      const findCharacter = await this.findByName(characterName);
      if (findCharacter) {
        return {
          ok: false,
          error: '이미 등록되어있는 캐릭터입니다.',
        };
      }

      const characterInfo = await this.crawlerService.scrape(characterName);
      const createdCharacter = new this.characterModel(characterInfo);

      await Promise.all([
        createdCharacter.save(),
        this.userModel.updateOne(
          { _id: userId },
          {
            $push: {
              characters: createdCharacter._id,
            },
          },
        ),
      ]);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '캐릭터를 추가하는데 실패하였습니다.',
      };
    }
  }

  async delete(
    { _id: userId }: User,
    { characterName }: DeleteCharacterInput,
  ): Promise<DeleteCharacterOutput> {
    try {
      const findCharacter = await this.findByName(characterName);
      if (!findCharacter) {
        return {
          ok: false,
          error: '등록되어있지 않은 캐릭터입니다.',
        };
      }

      await Promise.all([
        this.characterModel.deleteOne({ name: characterName }),
        this.userModel.updateOne(
          { _id: userId },
          {
            $pull: {
              characters: findCharacter._id,
            },
          },
        ),
      ]);

      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '캐릭터를 삭제하는데 실패하였습니다.',
      };
    }
  }

  async update({
    characterName,
  }: UpdateCharacterInput): Promise<UpdateCharacterOutput> {
    try {
      const findCharacter = await this.findByName(characterName);
      if (!findCharacter) {
        return {
          ok: false,
          error: '등록되어있지 않은 캐릭터입니다.',
        };
      }

      const { level, job, server } = await this.search(characterName);

      await this.characterModel.updateOne(
        { name: characterName },
        {
          $set: {
            level,
            job,
            server,
          },
        },
      );

      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '캐릭터 정보 갱신에 실패하였습니다.',
      };
    }
  }

  async search(characterName: string): Promise<SearchCharacterOutput> {
    try {
      const data = await this.crawlerService.scrape(characterName);
      return {
        ok: true,
        ...data,
      };
    } catch {
      return {
        ok: false,
        error: '캐릭터 정보를 불러오는데 실패하였습니다.',
      };
    }
  }

  async findByName(name: string): Promise<Character> {
    return this.characterModel.findOne({ name }).lean();
  }
}
