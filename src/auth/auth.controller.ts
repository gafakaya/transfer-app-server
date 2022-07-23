import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { SigninDto, SignupDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('local/signup')
  signupLocal(@Body() signupDto: SignupDto): Promise<Tokens> {
    return this.authService.signupLocal(signupDto);
  }
  @Post('local/signin')
  signinLocal(@Body() signinDto: SigninDto) {
    return this.authService.signinLocal(signinDto);
  }
  @Post('logout')
  logout() {
    return 'logout';
  }
  @Post('refresh')
  refreshTokens() {
    return 'refresh';
  }
}
