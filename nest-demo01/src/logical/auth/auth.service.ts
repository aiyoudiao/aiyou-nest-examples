import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from 'src/utils/cryptogram';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userName: string, password: string): Promise<any> {
    console.log('JWT 验证 - 校验用户信息');
    const user = await this.userService.findOne(userName);
    if (user) {
      const hashedPassword = user.password;
      const salt = user.salt;
      const hashPassword = encryptPassword(password, salt);
      if (hashedPassword === hashPassword) {
        return {
          code: 1,
          user,
        };
      } else {
        return {
          code: 2,
          user: null,
        };
      }
    }

    return {
      code: 3,
      user: null,
    };
  }

  async certificate(user: any) {
    const payload = {
      userName: user.userName,
      sub: user.userId,
      realName: user.realName,
      role: user.role,
    };
    console.log('JWT验证 处理jwt签证', 'payload: ', payload);

    try {
      const token = this.jwtService.sign(payload);
      return {
        code: 200,
        data: {
          token,
        },
        msg: `登录成功`,
      };
    } catch (error) {
      return {
        code: 600,
        msg: '账号或者密码错误',
      };
    }
  }
}
