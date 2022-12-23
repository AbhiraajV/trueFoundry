import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AssignUserGhDto,
  AuthDto,
  CreateGhCredsDto,
  GhCredsDto,
  LoginDto,
} from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Inject } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    @Inject('true_foundry') private client: ClientProxy,
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

  async createGhCreds(dto: CreateGhCredsDto) {
    console.log({ dto });
    try {
      const gh_cred = await this.prisma.githubCreds.create({
        data: dto,
      });
      return { status: 'success', data: gh_cred };
    } catch (error) {
      return { status: 'fail', data: error };
    }
  }

  async pushGhRepoReq(data: GhCredsDto) {
    console.log({ sending: data });
    return await this.client.emit('GH_SERVICE_BINDING_KEY', {
      event: 'CREATE_REPO_WITH_FILES',
      data: {
        key: data.gh_key,
        gh_username: data.gh_username,
        gh_repo: 'test' + Date.now(),
        gh_filename: 'someFile.py',
        email: data.email,
      },
    });
  }

  async assignGhCredsToUser(data: AssignUserGhDto) {
    try {
      const out = await this.prisma.githubCreds.update({
        where: {
          gh_generated_token: data.gh_generated_token,
        },
        data: {
          userId: data.userId,
        },
      });
      return {
        data: out,
        status: 'success',
      };
    } catch (err) {
      throw new Error('Asscociation failed');
    }
  }

  signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    return this.jwt.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
    });
  }
}
