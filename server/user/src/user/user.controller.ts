import { Controller, Req, Body, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { AuthGuard } from '@nestjs/passport';
@Controller('users')
export class UserController {
  @UseGuards(AuthGuard('jwt_auth_guard'))
  @Get('me')
  Me(@Req() req) {
    return req.user;
  }
}
