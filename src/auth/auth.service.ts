import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDto, SignupDto } from './dto';
import * as argon from 'argon2';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signupLocal(signupDto: SignupDto): Promise<Tokens> {
    const { firstName, lastName, password, email } = signupDto;
    const hash = await argon.hash(password);

    const newUser = await this.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        hashed: {
          create: {
            hash,
          },
        },
      },
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRefreshTokenHash(newUser.id, tokens.refresh_token);

    return tokens;
  }

  async signinLocal(signinDto: SigninDto): Promise<Tokens> {
    const { email, password } = signinDto;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        hashed: true,
      },
    });
    if (!user) throw new ForbiddenException('Creadentials incorrect');

    const isPasswordVerify = await argon.verify(user.hashed.hash, password);
    if (!isPasswordVerify)
      throw new ForbiddenException('Credentials incorrect');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: string): Promise<boolean> {
    await this.prisma.hashed.updateMany({
      where: {
        userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
    return true;
  }

  async refreshTokens(userId: string, refresh_token: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        hashed: true,
      },
    });
    if (!user || !user.hashed.hashedRt)
      throw new ForbiddenException('Access Denied');

    const refreshTokeVerify = await argon.verify(
      user.hashed.hashedRt,
      refresh_token,
    );
    if (!refreshTokeVerify) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

    return tokens;
  }

  //*----UTILITY FUNCTIONS----

  async updateRefreshTokenHash(
    userId: string,
    refresh_token: string,
  ): Promise<void> {
    const hash = await argon.hash(refresh_token);

    await this.prisma.hashed.update({
      where: {
        userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }
}
