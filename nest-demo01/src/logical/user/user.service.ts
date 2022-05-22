import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findOne(userName: string): string {
    if (userName === 'kid') {
      return 'kid is here';
    }
    return 'no one here';
  }
}
