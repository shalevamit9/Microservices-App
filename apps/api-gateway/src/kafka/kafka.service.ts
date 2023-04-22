import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ILoggerService } from 'logger';

@Injectable()
export class KafkaService implements OnModuleInit {
  public constructor(
    @Inject('EMAIL_SERVICE') private readonly client: ClientKafka,
    private readonly logger: ILoggerService,
  ) {
    console.log(`initialized ${KafkaService.name}`);
  }

  public async onModuleInit() {
    this.logger.info('hello from kafka service', { blue: ' screen' });
    await this.client.connect();
  }

  public emit(pattern: any, data: any) {
    return this.client.emit(pattern, data);
  }
}
