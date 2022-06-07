import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import mongoose from 'mongoose';
import { LoggerMiddleware } from './logger.middleware';
import { UserModule } from './user/user.module';
import { TeamModule } from './team/team.module';
import { CharacterModule } from './character/character.module';
import { RaidModule } from './raid/raid.module';
import { JwtModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { CrawlerModule } from './crawler/crawler.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'dev'
          ? '.env.development.local'
          : '.env.test.local',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'test', 'production').required(),
        MONGODB_USERNAME: Joi.string().required(),
        MONGODB_PASSWORD: Joi.string().required(),
        JWT_PRIVATE_KEY: Joi.string().required(),
      }),
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@loschedule-cluster-shard-00-00.k6f3i.mongodb.net:27017,loschedule-cluster-shard-00-01.k6f3i.mongodb.net:27017,loschedule-cluster-shard-00-02.k6f3i.mongodb.net:27017/${process.env.NODE_ENV}?ssl=true&replicaSet=atlas-o5ry00-shard-0&authSource=admin&retryWrites=true&w=majority`,
    ),
    JwtModule.forRoot({
      privateKey: process.env.JWT_PRIVATE_KEY,
    }),
    AuthModule,
    CrawlerModule,
    UserModule,
    CharacterModule,
    TeamModule,
    RaidModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    mongoose.set('debug', this.isDev);
  }
}
