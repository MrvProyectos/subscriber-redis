import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  async getRedis(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.appService.getRedis(id);
  }
}