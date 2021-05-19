import * as redisStore from "cache-manager-redis-store";
import { CacheModule, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
          store: redisStore,
      //     host: configService.get('REDIS_HOST'),
      //     port: configService.get('REDIS_PORT'),
      //     ttl: configService.get('CACHE_TTL'),
      //     max: configService.get('MAX_ITEM_IN_CACHE')
      })
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}