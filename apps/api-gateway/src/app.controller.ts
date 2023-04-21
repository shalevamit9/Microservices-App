import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { ILoggerService } from 'logger';
import { randomUUID } from 'node:crypto';
import { ConfigService } from 'config';
import { UserService } from './users/user.service';

@Controller()
export class AppController {
  public constructor(
    private readonly appService: AppService,
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
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

    // return this.userService
    //   .send<string>('hello', 'Amit')
    //   .pipe(tap((info) => console.log(info)));

    // For HTTP communication
    return await this.userHttpService.getAllUsers();
  }
}
