import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.TCP,
      options: {
        port: process.env.USER_SERVICE_PORT as unknown as number,
        host: '0.0.0.0',
      },
    });

  await microservice.listen();

  // For HTTP communication
  // const app = await NestFactory.create(AppModule);
  // await app.listen(3000);
}
bootstrap();
