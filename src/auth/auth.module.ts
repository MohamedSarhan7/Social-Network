import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
  ],
  providers: [
    AuthResolver,
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [
    AccessTokenStrategy,
    RefreshTokenStrategy,
    PassportModule,
    AuthService,
  ],
})
export class AuthModule {}
