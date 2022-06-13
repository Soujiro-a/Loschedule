import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class GetMembersInput {
  @IsString()
  @IsNotEmpty()
  readonly teamId: string;
}

export class GetMembersOutput extends CoreOutput {
  @IsObject()
  @IsOptional()
  readonly leader?: object;

  @IsArray()
  @IsOptional()
  readonly members?: object[];
}
