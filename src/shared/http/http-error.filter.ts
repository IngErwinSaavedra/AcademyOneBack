import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NODE_ENV } from 'src/config/constants';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
    constructor(private config: ConfigService) { }
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        const msgExeption =
            this.config.get<string>(NODE_ENV) !== 'dev' ? exception : 'Error';
        const errorResponse = {
            // code: status,
            // status:0,
            ok: false,
            timestamp: new Date().toLocaleDateString(),
            path: request.url,
            method: request.method,
            data: msgExeption,
            message:
                status !== HttpStatus.INTERNAL_SERVER_ERROR
                    ? exception['response']['message'] ||
                    exception.message ||
                    exception.message ||
                    null
                    : 'Internal server error',
        };

        if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
            Logger.error(
                `${request.method} ${request.url}`,
                exception.stack,
                'ExceptionFilter',
            );
        } else {
            Logger.error(
                `${request.method} ${request.url}`,
                JSON.stringify(errorResponse),
                'ExceptionFilter',
            );
        }

        response.status(status).json(errorResponse);
    }
}