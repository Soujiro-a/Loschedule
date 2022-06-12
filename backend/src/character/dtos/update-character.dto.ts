import { IsNotEmpty, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class UpdateCharacterInput {
  @IsString()
  @IsNotEmpty()
  readonly characterName: string;
}

export class UpdateCharacterOutput extends CoreOutput {}
