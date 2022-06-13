import { IsNotEmpty, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class CreateTeamInput {
  @IsString()
  @IsNotEmpty()
  readonly teamName: string;
}

export class CreateTeamOutput extends CoreOutput {}
