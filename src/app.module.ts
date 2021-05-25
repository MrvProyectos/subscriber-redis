import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { RedisService } from './redis/redis.service';
import { ConfigModule } from './config/config.module';
import { LoggerService } from './logger/logger.service';

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [RedisService, LoggerService],
})

export class AppModule {}