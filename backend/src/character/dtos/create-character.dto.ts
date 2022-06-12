import { IsNotEmpty, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class CreateCharacterInput {
  @IsString()
  @IsNotEmpty()
  readonly characterName: string;
}

export class CreateCharacterOutput extends CoreOutput {}
