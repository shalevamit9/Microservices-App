import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  const config = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [config.get().kafkaUri],
        clientId: 'email-service',
      },
      consumer: {
        groupId: 'email-service',
      },
    },
  });
  await app.startAllMicroservices();

  async function gracefullyShutdown() {
    await app.close();
  }

  process.once('SIGTERM', gracefullyShutdown);
  process.once('SIGINT', gracefullyShutdown);
}
bootstrap();
