import { IsNotEmpty, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class DeleteRaidInput {
  @IsString()
  @IsNotEmpty()
  readonly teamId: string;
}

export class DeleteRaidOutput extends CoreOutput {}
