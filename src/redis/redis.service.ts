import { Injectable } from '@nestjs/common';

const asyncRedis = require("async-redis");
const redisClient = asyncRedis.createClient();

redisClient.on("error", function(err){
    console.log("CONECTION-REDIS-ERROR" + err);
})

@Injectable()
export class RedisService {
    async getRedis(idKey: number ){
        const dataRedis: any = await redisClient.get(idKey);
        return JSON.parse(dataRedis);
    };
};