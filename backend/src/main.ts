import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import moment from 'moment-timezone';
import { KOREA_TIMEZONE } from './common/common.constants';

async function bootstrap() {
  moment.tz.setDefault(KOREA_TIMEZONE);
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4000);
}
bootstrap();
