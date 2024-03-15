import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
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
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [
    AccessTokenStrategy,
    RefreshTokenStrategy,
    PassportModule,
    AuthService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
