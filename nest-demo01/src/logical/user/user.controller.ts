import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('find-one')
  findOne(@Body() body: { userName: string }) {
    return this.userService.findOne(body.userName);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('register')
  async register(@Body() body: any) {
    return await this.userService.register(body);
  }

  @Post('login')
  async login(@Body() loginParams: any) {
    console.log('JWT 验证 用户登录');
    const authResult = await this.authService.validateUser(
      loginParams.userName,
      loginParams.password,
    );

    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: '账号或者密码不正确',
        };
      default:
        return {
          code: 600,
          msg: '查无此人',
        };
    }
  }
}
