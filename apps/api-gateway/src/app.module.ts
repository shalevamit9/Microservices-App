import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configLoader from 'config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';
import { LoggerModule } from 'logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configLoader],
    }),
    HttpModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('userServiceUrl'),
            port: configService.get('userServicePort'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
