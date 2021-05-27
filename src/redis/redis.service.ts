import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';

const asyncRedis = require("async-redis");
const redisClient = asyncRedis.createClient();

redisClient.on("error", function(err){
    console.log("CONECTION-REDIS-ERROR" + err);
})

@Injectable()
export class RedisService {
    constructor(private readonly _loggerService: LoggerService){};

    async getRedis(idKey: number){
        const dataRedis: string = await redisClient.get(idKey);

        if (dataRedis === null){
            this._loggerService.customError({}, {message: "=> Data Not Found"});
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Data Redis not found',
              }, HttpStatus.NOT_FOUND);
    
        }else{
            this._loggerService.customInfo({}, {message: 'OK'});
            return JSON.parse(dataRedis);
        }
    };
};