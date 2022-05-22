import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('find-one')
  findOne(@Body() body: { userName: string}) {
    console.log('body ', body);
    return this.userService.findOne(body.userName);
  }
}
