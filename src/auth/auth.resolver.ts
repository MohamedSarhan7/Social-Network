import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { LoginInput } from '../auth/dto/auth-login.input';
import { User } from 'src/user/entities/user.entity';
import { AuthResponse } from './dto/auth-response';
import { RegisterInput } from './dto/auth-register.input';
import { AuthService } from './auth.service';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  Login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Mutation(() => AuthResponse)
  Register(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }
}
