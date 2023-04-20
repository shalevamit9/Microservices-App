import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ILoggerService } from './logger.interface';
import winston from 'winston';
import LogstashTransport from 'winston-logstash/lib/winston-logstash-latest';

@Injectable()
export class LogstashLoggerService
  extends ILoggerService
  implements OnApplicationShutdown
{
  logger: winston.Logger;
  constructor() {
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

  info(message: string, additionalParams: Record<string, any>): void {
    this.logger.info(message, additionalParams);
  }

  verbose(message: string, additionalParams: Record<string, any>): void {
    this.logger.verbose(message, additionalParams);
  }

  log(message: string, additionalParams: Record<string, any>): void {
    this.info(message, additionalParams);
  }

  onApplicationShutdown(signal?: string) {
    this.logger.info(
      `onApplicationShutdown has been called with signal ${signal}`,
    );
    this.closeLoggerConnection();
  }

  private closeLoggerConnection() {
    this.logger.close();
  }
}
