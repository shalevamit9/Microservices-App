import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';
import { ILoggerService } from 'logger';
import { randomUUID } from 'node:crypto';
import { ConfigService } from 'config';
import { UserService } from './users/user.service';
import { KafkaService } from './kafka/kafka.service';

@Controller()
export class AppController {
  public constructor(
    private readonly appService: AppService,
    // @Inject('EMAIL_SERVICE') private readonly emailService: ClientKafka,
    private readonly emailService: KafkaService,
    private readonly config: ConfigService,
    private readonly logger: ILoggerService,
    private readonly userHttpService: UserService,
  ) {}

  @Get()
  public async getHello() {
    this.logger.log('hello from AppController', {
      correlationId: randomUUID(),
      username: 'App',
      password: 'Controller',
    });

    this.emailService.emit('send.email', {
      from: 'AppController',
      to: 'EMAIL_SERVICE',
      message: 'wassupp',
    });

    return await this.userHttpService.getAllUsers();
  }

  // public async onModuleInit() {
  //   await this.emailService.connect();
  // }
}
