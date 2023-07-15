import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginInput } from './dto/auth-login.input';
import { RegisterInput } from './dto/auth-register.input';
import * as bcrypt from 'bcryptjs';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwtPayload.type';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthResponse } from './dto/auth-response';
@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginInput: LoginInput) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        username: loginInput.username,
      },
    });

    if (!userExists) throw new BadRequestException('Invalid cerdintioals!');
    const passwordMatches = await bcrypt.compare(
      loginInput.password,
      userExists.password,
    );
    if (!passwordMatches)
      throw new BadRequestException('Invalid cerdintioals!');

    const tokens = await this.genrateTokens(userExists.id, userExists.username);
    const rtHash = await this.hashData(tokens.refresh_token);
    await this.updateRtHash(userExists.id, rtHash);
    return new AuthResponse({
      ...userExists,
      atToken: tokens.access_token,
      rtToken: tokens.refresh_token,
    });
  }

  async register(registerInput: RegisterInput): Promise<AuthResponse> {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        username: registerInput.username,
      },
    });

    if (userExists) throw new BadRequestException('username already exists');

    const hashedPassword = await this.hashData(registerInput.password);
    const newUser = await this.prismaService.user.create({
      data: {
        username: registerInput.username,
        password: hashedPassword,
        picture: registerInput.picture || '',
      },
    });
    const tokens = await this.genrateTokens(newUser.id, newUser.username);
    const rtHash = await this.hashData(tokens.refresh_token);
    await this.updateRtHash(newUser.id, rtHash);
    // return tokens;
    return new AuthResponse({
      ...newUser,
      atToken: tokens.access_token,
      rtToken: tokens.refresh_token,
    });
  }

  private async hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  private async genrateTokens(id: string, username: string): Promise<Tokens> {
    const JwtPayload: JwtPayload = {
      id,
      username,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(JwtPayload, {
        secret: this.configService.get('access_token_secret'),
        expiresIn: this.configService.get('access_token_expiresin'),
      }),
      this.jwtService.signAsync(JwtPayload, {
        secret: this.configService.get('refresh_token_secret'),
        expiresIn: this.configService.get('access_token_expiresin'),
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  private async updateRtHash(id: string, value: string | null) {
    // const hash = await this.hashData(rt);
    await this.prismaService.user.update({
      where: { id },
      data: {
        rtHashed: value,
      },
    });
  }
}
