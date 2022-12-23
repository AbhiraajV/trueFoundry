import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, LoginDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(input: AuthDto) {
    try {
      // create hash password
      const hashedPassword = await argon.hash(input.password);
      // create user
      const user = await this.prisma.user.create({
        data: { ...input, password: hashedPassword },
      });

      return { token: await this.signToken(user.id, user.email), user };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }

      throw error;
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email as string },
    });

    if (!user) throw new ForbiddenException('Credentials Incorrect');

    const pswdMatches = await argon.verify(user.password, dto.password);

    if (!pswdMatches) throw new ForbiddenException('Credentials Incorrect');
    return { token: await this.signToken(user.id, user.email), user };
  }

  signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    return this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });
  }
}
