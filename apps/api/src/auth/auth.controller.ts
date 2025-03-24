import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BodyDTO } from 'src/dto/body.dto';
import { SignInDTO, SignInWithSSODTO, SignOutDTO, SignUpDTO } from './auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() body: SignUpDTO) {
    return this.authService.signUp(body);
  }

  @Post('sign-in')
  signIn(@Body() body: SignInDTO) {
    return this.authService.signIn(body);
  }

  @Post('sign-in-with-sso')
  signInWithSSO(@Body() body: SignInWithSSODTO) {
    return this.authService.signInWithSSO(body);
  }

  @Post('sign-out')
  signOut(@Body() body: SignOutDTO) {
    return this.authService.signOut(body);
  }
}
