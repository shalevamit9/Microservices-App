import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { ConfigService } from 'config';

@Controller()
export class AppController {
  public constructor(
    private readonly appService: AppService,
    private readonly config: ConfigService,
  ) {}

  @Get()
  public getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('hello')
  public accumulate(name: string): string {
    console.log({
      PORT: this.config.get().userServicePort,
    });

    return `Hello ${name}`;
  }
}
