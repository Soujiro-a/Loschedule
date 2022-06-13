import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class CreateRaidInput {
  @IsString()
  @IsNotEmpty()
  readonly targetDate: string;

  @IsString()
  @IsNotEmpty()
  readonly bossName: string;

  @IsString()
  @IsNotEmpty()
  readonly teamId: string;

  @IsArray()
  @IsOptional()
  readonly characters?: string[];
}

export class CreateRaidOutput extends CoreOutput {}
