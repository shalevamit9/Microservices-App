import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ILoggerService } from './logger.interface';
import winston from 'winston';
import LogstashTransport from 'winston-logstash/lib/winston-logstash-latest';

@Injectable()
export class LogstashLoggerService
  extends ILoggerService
  implements OnApplicationShutdown
{
  private readonly logger: winston.Logger;

  public constructor() {
    super();
    this.logger = winston.createLogger({
      transports: [
        new LogstashTransport({
          port: 5044,
          host: 'logstash-logstash',
        }),
      ],
    });
  }

  public info(message: string, additionalParams: Record<string, any>): void {
    this.logger.info(message, additionalParams);
  }

  public verbose(message: string, additionalParams: Record<string, any>): void {
    this.logger.verbose(message, additionalParams);
  }

  public log(message: string, additionalParams: Record<string, any>): void {
    this.info(message, additionalParams);
  }

  public onApplicationShutdown(signal?: string) {
    this.logger.info(
      `onApplicationShutdown has been called with signal ${signal}`,
    );
    this.closeLoggerConnection();
  }

  private closeLoggerConnection() {
    this.logger.close();
  }
}
