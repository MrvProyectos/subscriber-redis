import { Controller, Get, HttpStatus, Param, ParseIntPipe, Res } from "@nestjs/common";
import { RedisService } from './redis/redis.service';
import { LoggerService } from './logger/logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly _redisService: RedisService,
    private readonly _loggerService: LoggerService
    ){}

  @Get(':idKey')
  async getRedis(@Param('idKey', ParseIntPipe) idKey: number, @Res() res){
    const dataRedis: any = await this._redisService.getRedis(idKey);

    if (dataRedis === null){
      this._loggerService.customError({}, {message: "=> Data Not Found"});
      return res.status(HttpStatus.NOT_FOUND).json(`${res.statusCode} - Data Not Found: Key => ${idKey} `);
    } else {
        this._loggerService.customInfo({}, {message: `finished => ${idKey}`});
        return res.status(HttpStatus.OK).json(dataRedis);
    }
  }
}