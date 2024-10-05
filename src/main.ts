import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './env';
import { ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from './common/filters/ValidationExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(env.PORT);
  console.log(`Backend Port:${env.PORT}`);
}
bootstrap();
