import { Injectable, Inject, CACHE_MANAGER } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getRedis(id: number): Promise<string> {

    try {
      const res = await this.cacheManager.get(id);

      if (res){
        console.log(res);
        return res;
      }else{
        const msgErrorr = 'REDIS-KEY NOT FOUND';
        return msgErrorr;
      }

    } catch (e) {
      const msgErrorr = 'REDIS-KEY ERROR';
      return msgErrorr;
    }
  }
}