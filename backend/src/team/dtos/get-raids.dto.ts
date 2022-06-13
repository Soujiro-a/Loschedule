import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class GetRaidsInput {
  @IsString()
  @IsNotEmpty()
  readonly teamId: string;
}

export class GetRaidsOutput extends CoreOutput {
  @IsArray()
  @IsOptional()
  readonly raids?: object[];
}
