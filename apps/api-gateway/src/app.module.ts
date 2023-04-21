import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from 'config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';
import { LoggerModule } from 'logger';
import { UserModule } from './users/user.module';

@Module({
  imports: [ConfigModule.register({}), HttpModule, LoggerModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get().userServiceUrl,
            port: configService.get().userServicePort,
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
