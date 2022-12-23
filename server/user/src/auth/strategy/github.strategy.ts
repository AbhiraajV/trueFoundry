import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy as GH_Strategy } from 'passport-github';
import { AuthService } from '../auth.service';
import { VerifyCallback } from 'passport-jwt';

@Injectable()
export class GithubStrategy extends PassportStrategy(GH_Strategy, 'github') {
  constructor(configService: ConfigService, private authService: AuthService) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: 'http://localhost:8080/auth/callback',
      scope: ['repo'],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    // this.authService.createGhCreds({gh_key})
    return { data: { profile, accessToken, _refreshToken } };
  }
}
