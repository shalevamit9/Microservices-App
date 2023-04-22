import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from 'config';
import { KafkaService } from './kafka.service';
import { LoggerModule } from 'logger';

@Module({
  imports: [
    LoggerModule,
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: 'EMAIL_SERVICE',
        useFactory: (config: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              brokers: [config.get().kafkaUri],
              clientId: 'API_GATEWAY_SERVICE',
            },
            producerOnlyMode: true,
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
