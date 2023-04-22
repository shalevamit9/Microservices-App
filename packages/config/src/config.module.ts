import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CONFIG_OPTIONS } from './config.constants';

@Module({
  providers: [
    {
      provide: CONFIG_OPTIONS,
      useValue: {},
    },
    ConfigService,
  ],
  exports: [ConfigService],
})
export class ConfigModule {
  public static register(options: Record<string, any>): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
