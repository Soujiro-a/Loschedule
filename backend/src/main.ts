import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import csurf from 'csurf';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());
  app.use(cookieParser());
  app.use(csurf());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4000);
}
bootstrap();
