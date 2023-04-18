import { Module, ConsoleLogger } from '@nestjs/common';
import { LogstashLoggerService } from './logger.service';
import { ILoggerService } from './logger.interface';

const loggerClass =
  process.env.NODE_ENV !== 'development'
    ? LogstashLoggerService
    : ConsoleLogger;

@Module({
  providers: [
    {
      provide: ILoggerService,
      useClass: loggerClass,
    },
  ],
  exports: [
    {
      provide: ILoggerService,
      useClass: loggerClass,
    },
  ],
})
export class LoggerModule {}
