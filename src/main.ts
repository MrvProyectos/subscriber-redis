import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from './exception-filters/all-exceptions.filter';

require('dotenv').config();

async function bootstrap(){
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  const logger = new Logger();
  
  const options = new DocumentBuilder()
  .setTitle('Get SubScriber - Redis')
  .setDescription('Lectura de data desde REDIS')
  .setVersion('1.0')
  .addTag('redis')
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new AllExceptionsFilter);
  app.listen(port);

  logger.log(`Server Start => ${port}`);
}

bootstrap();