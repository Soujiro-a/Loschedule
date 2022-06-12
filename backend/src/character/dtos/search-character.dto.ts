import { IsNumber, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class SearchCharacterOutput extends CoreOutput {
  @IsString()
  readonly name?: string;

  @IsNumber()
  level?: number;

  @IsString()
  job?: string;

  @IsString()
  server?: string;
}
