import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { tap } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { ILoggerService } from 'logger';
import { randomUUID } from 'node:crypto';
import { ConfigService } from 'config';

@Controller()
export class AppController {
  public constructor(
    private readonly appService: AppService,
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
    private readonly logger: ILoggerService,
  ) {}

  @Get()
  public getHello() {
    this.logger.log('hello from AppController', {
      correlationId: randomUUID(),
      username: 'App',
      password: 'Controller',
    });

    return this.userService
      .send<string>('hello', 'Amit')
      .pipe(tap((info) => console.log(info)));

    // For HTTP communication
    // const userServiceUrl = this.config.get('userServiceUrl');
    // const userServicePort = this.config.get('userServicePort');
    // return this.httpService
    //   .get(`http://${userServiceUrl}:${userServicePort}/users`)
    //   .pipe(map((response) => response.data));
  }
}
