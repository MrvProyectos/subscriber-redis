import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { RedisService } from './redis/redis.service';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [RedisService],
})

export class AppModule {}