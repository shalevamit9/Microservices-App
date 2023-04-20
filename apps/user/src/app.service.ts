import { Injectable } from '@nestjs/common';
import { ILoggerService } from 'logger';

@Injectable()
export class AppService {
  constructor(private readonly logger: ILoggerService) {}
  getHello(): string {
    return 'Hello from User service';
  }
}
