import { Injectable } from '@nestjs/common';
import { ILoggerService } from 'logger';

@Injectable()
export class AppService {
  public constructor(private readonly logger: ILoggerService) {}

  public getHello(): string {
    return 'Hello from User service';
  }
}
