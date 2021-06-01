import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Req } from "@nestjs/common";
import { LoggerService } from "./logger/logger.service";
import { RedisService } from './redis/redis.service';

@Controller()
export class AppController {
  constructor(
    private readonly _redisService: RedisService,
    private readonly _loggerService: LoggerService
    ){}

    @Get(':idKey')
    @HttpCode(HttpStatus.OK)
    async getRedis(@Param('idKey', ParseIntPipe) idKey: number){
      const dataRedis: any = await this._redisService.getRedis(idKey);

      return {
        status: HttpStatus.OK,
        statusDescription: dataRedis
      };
    }
}