import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { LoggerService } from 'src/logger/logger.service';
import { ValidationDTO } from './../dto/validation.dto';

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

        if (dataRedis !== null){
            // DTO
            const validationResult: ValidationDTO = JSON.parse(dataRedis);
            const result = new ValidationDTO(validationResult);
            const validation = await validate(result);

            if (validation.length === 0){
                this._loggerService.customInfo({}, {message: 'Data Validated OK.'});
                return JSON.parse(dataRedis);    
            }else{
                this._loggerService.customError({}, {message: "=> the server could not interpret the request given invalid syntax."});
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: 'the server could not interpret the request given invalid syntax.',
                }, HttpStatus.BAD_REQUEST);            
            }
        }else{
            this._loggerService.customError({}, {message: "=> Data Redis Not Found"});
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Data Redis Not Found',
            }, HttpStatus.NOT_FOUND);
        }
    };
};