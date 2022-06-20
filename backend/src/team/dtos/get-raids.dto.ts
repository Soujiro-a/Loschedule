import { IsArray, IsOptional } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class GetRaidsOutput extends CoreOutput {
  @IsArray()
  @IsOptional()
  readonly raids?: object[];
}
