import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserService } from './logical/user/user.service';
// import { UserController } from './logical/user/user.controller';
import { UserModule } from './logical/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
  // controllers: [AppController, UserController],
  // providers: [AppService, UserService],
})
export class AppModule {}
