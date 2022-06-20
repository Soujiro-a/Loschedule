import { IsArray, IsObject, IsOptional } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
export class GetMembersOutput extends CoreOutput {
  @IsObject()
  @IsOptional()
  readonly leader?: object;

  @IsArray()
  @IsOptional()
  readonly members?: object[];
}
