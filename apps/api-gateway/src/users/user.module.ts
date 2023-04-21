import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from 'config';
import { UserService } from './user.service';

@Module({
  imports: [ConfigModule.register({}), HttpModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
