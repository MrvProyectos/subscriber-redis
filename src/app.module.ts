//import * as redisStore from "cache-manager-redis-store";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
//import { AppService } from "./app.service";

// import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisService } from './redis/redis.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [RedisService],
})
export class AppModule {}