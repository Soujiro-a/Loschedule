import { IsNotEmpty, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class LoginInput {
  @IsString()
  @IsNotEmpty()
  readonly nickname: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class LoginOutput extends CoreOutput {
  @IsString()
  readonly token?: string;
}
