import { IsNotEmpty, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class ChangeLeaderInput {
  @IsString()
  @IsNotEmpty()
  readonly teamId: string;

  @IsString()
  @IsNotEmpty()
  readonly newLeaderId: string;
}

export class ChangeLeaderOutput extends CoreOutput {}
