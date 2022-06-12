import { IsArray, IsOptional, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class UserProfileOutput extends CoreOutput {
  @IsString()
  @IsOptional()
  readonly nickname?: string;

  @IsArray()
  @IsOptional()
  readonly characters?: object[];

  @IsArray()
  @IsOptional()
  readonly teams?: object[];
}
