import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class EditRaidInput {
  @IsString()
  @IsNotEmpty()
  readonly raidId: string;

  @IsString()
  @IsOptional()
  readonly bossName?: string;

  @IsString()
  @IsOptional()
  readonly targetDate?: string;

  @IsArray()
  @IsOptional()
  readonly characters?: string[];
}

export class EditRaidOutput extends CoreOutput {}
