import { IsNotEmpty, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class JoinTeamInput {
  @IsString()
  @IsNotEmpty()
  readonly teamId: string;
}

export class JoinTeamOutput extends CoreOutput {}
