import { Catch, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { LoggerService } from './../logger/logger.service';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {

  private environment = process.env.ENVIRONMENT;
  private tunnelResponse = false;
  private logger = new LoggerService();

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // NUEVO
    // const httpException = (exception instanceof HttpException) ? exception.getResponse() : null;
    // const error: Record<string, any> = (httpException) ? exception.response.data || 
    // exception.response.message : exception.message || exception;

    const httpException = (exception instanceof HttpException) ? exception.getResponse() : 
                          (exception.message) ? exception.message : 
                          exception ? exception.response.data : exception.response.message;

    const error: Record<string, any> = (httpException);
    // console.log(`httpException => ${JSON.stringify(exception)}`);
    // console.log(`error => ${JSON.stringify(error)}`);

    // ANTIGUO
    // const error: Record<string, any> = (exception instanceof HttpException) ? exception.getResponse() : (exception.message) ? exception.message : exception;

    this.logger.error(request.headers, error);

    const status = (exception.response) ? exception.response.status || exception.response.statusCode || exception.status
      || HttpStatus.INTERNAL_SERVER_ERROR : (exception.status) ? exception.status : HttpStatus.INTERNAL_SERVER_ERROR

    let statusDescription = '';
    let url = '';
    if (this.environment === 'production') {
      return response.status(status)
        .json({
          status,
          statusDescription,
        });
    }

    statusDescription = (exception.response) ? error : exception.message;
    url = request.url;

    // console.log(`statusDescription => ${JSON.stringify(exception.response)}`);
    // console.log(`statusDescription2 => ${JSON.stringify(exception.message)}`);

    return response.status(status)
      .json({
        status,
        statusDescription,
        url,
      });
  }
}
