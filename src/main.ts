import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

require('dotenv').config();

async function bootstrap(){
  const app = NestFactory.create(AppModule);
  const port = process.env.PORT;

  const options = new DocumentBuilder()
  .setTitle('Get SubScriber - Redis')
  .setDescription('Lectura de data desde REDIS')
  .setVersion('1.0')
  .addTag('redis')
  .build();

  const document = SwaggerModule.createDocument(await app, options);
  SwaggerModule.setup('api', await app, document);

  (await app).listen(port);
}

bootstrap();