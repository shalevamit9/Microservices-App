import { Module } from '@nestjs/common';
import { LogstashLoggerService } from './logger.service';
import { ILoggerService } from './logger.interface';

@Module({
  providers: [
    {
      provide: ILoggerService,
      useClass: LogstashLoggerService,
    },
  ],
  exports: [
    {
      provide: ILoggerService,
      useClass: LogstashLoggerService,
    },
  ],
})
export class LoggerModule {}
