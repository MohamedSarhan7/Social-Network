import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, AuthResponse } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginInput: LoginDto): Promise<AuthResponse> {
    return this.authService.login(loginInput);
  }

  @Post('register')
  async register(@Body() registerInput: RegisterDto): Promise<AuthResponse> {
    return this.authService.register(registerInput);
  }
}
