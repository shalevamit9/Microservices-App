import { Injectable } from '@nestjs/common';
import { ILoggerService } from './logger.interface';
import winston from 'winston';
import LogstashTransport from 'winston-logstash/lib/winston-logstash-latest';

@Injectable()
export class LogstashLoggerService extends ILoggerService {
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
}
