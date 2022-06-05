import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CoreOutput {
  @IsBoolean()
  @IsNotEmpty()
  readonly ok: boolean;

  @IsString()
  readonly error?: string;
}
