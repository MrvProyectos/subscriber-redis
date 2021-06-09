import { Controller, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe } from "@nestjs/common";
import { validate } from "class-validator";
import { ValidationDTO } from "./dto/validation.dto";
import { LoggerService } from "./logger/logger.service";
import { RedisService } from './redis/redis.service';

@Controller()
export class AppController {
  constructor(private readonly _redisService: RedisService,
              private readonly _logger: LoggerService){}

  @Get(':idKey')
  @HttpCode(HttpStatus.OK)
  async getRedis(@Param('idKey') idKey: string){
    const dataRedis: any = await this._redisService.getRedis(idKey);

    // CON TRY CATCH
    try{
      if (!dataRedis){
        this._logger.info({}, {message: `Data Redis Not Found => ${JSON.stringify(dataRedis)}`});
        throw new HttpException ({
          status: HttpStatus.NOT_FOUND,
          errorMessage: 'Data Redis Cache Not Found!',
        }, HttpStatus.NOT_FOUND);

      }else{
        const validation = await validate(dataRedis as ValidationDTO);
        if (validation.length === 0){
          this._logger.info({}, {message: `Data Validated is OK => ${JSON.stringify(validation)}`});
          return {status: HttpStatus.OK, statusDescription: dataRedis};
  
        }else{
          this._logger.error({}, {message: "=> Validation Error Data Redis Cache."});
          throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            errorMessage: 'Validation Error Data Redis Cache.',
          }, HttpStatus.BAD_REQUEST);
        }
      }

    }catch(e){
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          statusMessage: 'Unexpected Server Error.',
        }, HttpStatus.CONFLICT);  
      }

    // SIN TRY - CATCH
    // if (!dataRedis){
    //   this._logger.info({}, {message: `Data Redis Not Found => ${JSON.stringify(dataRedis)}`});
    //   throw new HttpException ({
    //     status: HttpStatus.NOT_FOUND,
    //     errorMessage: 'Data Redis Cache Not Found!',
    //   }, HttpStatus.NOT_FOUND);

    // }else{
    //   const validation = await validate(dataRedis as ValidationDTO);
    //   if (validation.length === 0){
    //     this._logger.info({}, {message: `Data Validated is OK => ${JSON.stringify(validation)}`});
    //     return {status: HttpStatus.OK, statusDescription: dataRedis};

    //   }else{
    //     this._logger.error({}, {message: "=> Validation Error Data Redis Cache."});
    //     throw new HttpException({
    //       status: HttpStatus.BAD_REQUEST,
    //       errorMessage: 'Validation Error Data Redis Cache.',
    //     }, HttpStatus.BAD_REQUEST);
    //   }
    // }

  }
}