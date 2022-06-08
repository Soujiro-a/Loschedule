import { IsOptional, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class EditUserInput {
  @IsString()
  @IsOptional()
  readonly nickname?: string;

  @IsString()
  @IsOptional()
  readonly password?: string;
}

export class EditUserOutput extends CoreOutput {}
