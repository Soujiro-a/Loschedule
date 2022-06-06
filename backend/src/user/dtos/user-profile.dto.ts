import { IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class UserProfileOutput extends CoreOutput {
  @IsString()
  readonly nickname?: string;

  @IsString()
  readonly role?: string;
}
