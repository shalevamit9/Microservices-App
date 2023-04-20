import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  const config = app.get(ConfigService);
  const port = config.get().apiGatewayServicePort || 3000;
  await app.listen(port);

  async function gracefullyShutdown() {
    await app.close();
  }

  process.once('SIGTERM', gracefullyShutdown);
  process.once('SIGINT', gracefullyShutdown);
}
bootstrap();
