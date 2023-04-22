import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { ILoggerService } from 'logger';

@Controller()
export class AppController {
  public constructor(
    private readonly appService: AppService,
    private readonly logger: ILoggerService,
  ) {}

  @Get()
  public getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('send.email')
  public eventTest(payload: Record<string, any>) {
    console.log('log from AppController/eventTest');
    this.logger.info('Hello from email service', payload);
  }
}
