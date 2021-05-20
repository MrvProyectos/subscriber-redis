import { Controller, Get, HttpStatus, Param, ParseIntPipe, Res } from "@nestjs/common";
import { RedisService } from './redis/redis.service';

@Controller()
export class AppController {
  constructor(private readonly _redisService: RedisService) {}

  @Get(':idKey')
  async getRedis(@Param('idKey', ParseIntPipe) idKey: number, @Res() res){
    const dataRedis: any = await this._redisService.getRedis(idKey);

    if (dataRedis === null){
      return res.status(HttpStatus.NOT_FOUND).json(`${res.statusCode} - Data Not Found: Key => ${idKey} `);
    } else {
        return res.status(HttpStatus.OK).json(dataRedis);
    }
  }
}