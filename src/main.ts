import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(){
  const app = NestFactory.create(AppModule);
  await (await app).listen(6300);
}

bootstrap();
