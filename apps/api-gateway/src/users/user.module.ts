import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from 'config';
import { UserService } from './user.service';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [ConfigModule, HttpModule, KafkaModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
