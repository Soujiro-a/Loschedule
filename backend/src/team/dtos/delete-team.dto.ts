import { IsNotEmpty, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class DeleteTeamInput {
  @IsString()
  @IsNotEmpty()
  readonly teamId: string;
}

export class DeleteTeamOutput extends CoreOutput {}
