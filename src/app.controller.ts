import { Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe } from "@nestjs/common";
import { validate } from "class-validator";
import { ValidationDTO } from "./dto/validation.dto";
import { LoggerService } from "./logger/logger.service";
import { RedisService } from './redis/redis.service';

@Controller()
export class AppController {
  constructor(private readonly _redisService: RedisService,
              private readonly _logger: LoggerService){}

  @Get(':idKey')
  async getRedis(@Param('idKey', ParseIntPipe) idKey: number){
    const dataRedis: any = await this._redisService.getRedis(idKey);

    if (dataRedis === null){
      this._logger.customError({}, {message: "=> Data Redis Not Found."});
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Data Redis Cache Not Found.',
      }, HttpStatus.NOT_FOUND);
    }else{
      const validation = await validate(dataRedis as ValidationDTO);
      if (validation.length === 0){
        this._logger.customInfo({}, { message: 'Data Validated is OK.'})
        return {status: HttpStatus.OK, statusDescription: dataRedis};
      }else{
        this._logger.customError({}, {message: "=> Validation Error Data Redis Cache."});
        throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: 'Validation Error Data Redis Cache.',
        }, HttpStatus.BAD_REQUEST);
      }
    }
  }
}