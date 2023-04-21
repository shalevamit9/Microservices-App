import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from 'config';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // const config = app.get(ConfigService);

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.TCP,
  //   options: {
  //     port: config.get().userServicePort,
  //     host: config.get().hostname,
  //   },
  // });
  // await app.startAllMicroservices();

  // async function gracefullyShutdown() {
  //   await app.close();
  // }

  // process.once('SIGTERM', gracefullyShutdown);
  // process.once('SIGINT', gracefullyShutdown);

  // For HTTP communication
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  await app.listen(config.get().userServicePort);
}
bootstrap();
