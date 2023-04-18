import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from 'config';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // const config = app.get(ConfigService);
  // const port = config.get().userServicePort || 3001;

  // app.connectMicroservice({
  //   transport: Transport.TCP,
  //   options: {
  //     port,
  //     host: 'user-service',
  //   },
  // });

  // await app.startAllMicroservices();
  // await app.listen(port);

  const app = await NestFactory.createApplicationContext(AppModule);
  const config = app.get(ConfigService);

  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.TCP,
      options: {
        port: config.get().userServicePort,
        host: '0.0.0.0',
      },
    });

  await microservice.listen();

  // For HTTP communication
  // const app = await NestFactory.create(AppModule);
  // await app.listen(3000);
}
bootstrap();
