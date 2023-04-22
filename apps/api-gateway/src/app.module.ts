import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from 'config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';
import { LoggerModule } from 'logger';
import { UserModule } from './users/user.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    LoggerModule,
    UserModule,
    KafkaModule,
    // ClientsModule.registerAsync([
    //   {
    //     imports: [ConfigModule],
    //     name: 'EMAIL_SERVICE',
    //     useFactory: (config: ConfigService) => ({
    //       transport: Transport.KAFKA,
    //       options: {
    //         client: {
    //           brokers: [config.get().kafkaUri],
    //           clientId: 'API_GATEWAY_SERVICE',
    //         },
    //         producerOnlyMode: true,
    //       },
    //     }),
    //     inject: [ConfigService],
    //   },
    // ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
