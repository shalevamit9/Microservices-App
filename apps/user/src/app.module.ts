import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from 'config';

@Module({
  imports: [ConfigModule.register({})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
