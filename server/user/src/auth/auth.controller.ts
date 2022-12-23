import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body, Get, Req, UseGuards } from '@nestjs/common/decorators';
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
    console.log('Logging in with github');
    //
  }

  @Get('callback')
  @UseGuards(AuthGuard('github'))
  async authCallback(@Req() req) {
    const user = req.user;
    const payload = { sub: user.id, username: user.username };
    return { accessToken: this.jwtService.sign(payload) };
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
