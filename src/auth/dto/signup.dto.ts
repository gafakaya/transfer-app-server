import { IsNotEmpty, IsString } from 'class-validator';
import { AuthDto } from './auth.dto';

export class SignupDto extends AuthDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  trId: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  phoneIdd: string;
}
