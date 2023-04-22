import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from 'config';
import { HttpModule } from '@nestjs/axios';
import { LoggerModule } from 'logger';
import { UserModule } from './users/user.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [ConfigModule, HttpModule, LoggerModule, UserModule, KafkaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
