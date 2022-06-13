import { IsNotEmpty, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class LeaveTeamInput {
  @IsString()
  @IsNotEmpty()
  readonly teamId: string;
}

export class LeaveTeamOutput extends CoreOutput {}
