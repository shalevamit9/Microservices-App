import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ILoggerService } from 'logger';
import { randomUUID } from 'node:crypto';
import { ConfigService } from 'config';
import { UserService } from './users/user.service';
import { KafkaService } from './kafka/kafka.service';

@Controller()
export class AppController {
  public constructor(
    private readonly appService: AppService,
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
}
