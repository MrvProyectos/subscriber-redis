import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from './exception-filters/all-exceptions.filter';

require('dotenv').config();

async function bootstrap(){
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  const logger = new Logger();
  const { httpAdapter } = app.get(HttpAdapterHost);
  
  const options = new DocumentBuilder()
  .setTitle('Get SubScriber - Redis')
  .setDescription('Lectura de data desde REDIS')
  .setVersion('1.0')
  .addTag('redis')
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.listen(port);

  logger.log(`Server Start => ${port}`);
}

bootstrap();