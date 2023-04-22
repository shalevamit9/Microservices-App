import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from './config.constants';
import * as dotenv from 'dotenv';
import { EnvConfig } from './config.interface';
import path from 'path';

@Injectable()
export class ConfigService {
  private readonly config: EnvConfig;

  public constructor(@Inject(CONFIG_OPTIONS) options: Record<string, any>) {
    const envFilePath = this.getEnvFilePath();
    this.loadEnv(envFilePath);
    this.config = this.initializeEnvConfig();
  }

  private getEnvFilePath() {
    return path.join(process.cwd(), 'envs', `${process.env.NODE_ENV}.env`);
  }

  private initializeEnvConfig(): EnvConfig {
    return {
      hostname: process.env.HOSTNAME || '0.0.0.0',
      apiGatewayServicePort: parseInt(process.env.API_GATEWAY_SERVICE_PORT),
      apiGatewayServiceUrl: process.env.API_GATEWAY_SERVICE_URL,
      emailServiceUrl: process.env.EMAIL_SERVICE_URL,
      emailServicePort: parseInt(process.env.EMAIL_SERVICE_PORT),
      userServicePort: parseInt(process.env.USER_SERVICE_PORT),
      userServiceUrl: process.env.USER_SERVICE_URL,
      kafkaUri: process.env.KAFKA_URI,
    };
  }

  private loadEnv(path: string) {
    dotenv.config({ path });
  }

  public get(): EnvConfig {
    return this.config;
  }
}
