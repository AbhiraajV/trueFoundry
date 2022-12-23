import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  Body,
  Get,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common/decorators';
import { AuthDto, LoginDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Get('gh/login')
  @UseGuards(AuthGuard('github'))
  async login(@Req() req) {
    console.log(req.body);
    console.log('LOGIN');
    //
  }

  @UseGuards(AuthGuard('jwt_auth_guard'))
  @Post('gh/repo')
  async createRepo(@Req() req) {
    try {
      const out = await this.authService.assignGhCredsToUser({
        gh_generated_token: req.body.gh_generated_token,
        userId: req.user.id,
      });
      const enqueue = await this.authService.pushGhRepoReq({
        gh_key: out.data.gh_key,
        gh_username: out.data.gh_username,
        email: req.user.payload.email,
      });
      return { status: 'success', data: { out, enqueue } };
    } catch (error) {
      return { status: 'failed', data: { error } };
    }
  }

  @Get('callback')
  @UseGuards(AuthGuard('github'))
  @Redirect('http://localhost:3000/callback', 201)
  async authCallback(@Req() req, @Res() res) {
    const gh_generated_token = req.query.code;
    const out = await this.authService.createGhCreds({
      gh_generated_token: gh_generated_token,
      gh_key: req.user.data.accessToken,
      gh_username: req.user.data.profile.username,
    });
    console.log({ out });
    if (out.status === 'success') {
      return {
        url:
          'http://localhost:3000/callback?status=success&gh_token=' +
          gh_generated_token,
      };
    } else {
      return {
        url:
          'http://localhost:3000/?status=fail&gh_token=' + gh_generated_token,
      };
    }
    // return { url: 'http://localhost:3000/callback?' + gh_generated_token };
  }

  @Post('signup')
  async signup(@Body() req_body: AuthDto) {
    return await this.authService.signup(req_body);
  }

  @Post('signin')
  async signin(@Body() req_body: LoginDto) {
    return await this.authService.login(req_body);
  }
}
