import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class GetRaidInput {
  @IsString()
  @IsNotEmpty()
  readonly raidId: string;

  @IsString()
  @IsNotEmpty()
  readonly teamId: string;
}

export class GetRaidOutput extends CoreOutput {
  @IsArray()
  @IsOptional()
  readonly characters?: object[];

  @IsString()
  @IsOptional()
  readonly bossName?: string;

  @IsString()
  @IsOptional()
  readonly targetDate?: string;
}
