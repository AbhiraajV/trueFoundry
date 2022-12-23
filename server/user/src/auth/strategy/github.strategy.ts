import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy as GH_Strategy } from 'passport-github';

@Injectable()
export class GithubStrategy extends PassportStrategy(GH_Strategy, 'github') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: 'http://localhost:8080/auth/callback',
      scope: ['repo'],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    console.log({ profile, accessToken, _refreshToken });
    return profile;
  }
}
