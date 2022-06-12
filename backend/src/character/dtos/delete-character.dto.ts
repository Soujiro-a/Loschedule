import { IsNotEmpty, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class DeleteCharacterInput {
  @IsString()
  @IsNotEmpty()
  readonly characterName: string;
}

export class DeleteCharacterOutput extends CoreOutput {}
