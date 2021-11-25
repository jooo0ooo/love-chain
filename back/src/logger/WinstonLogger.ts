import {Injectable, LoggerService, Scope} from '@nestjs/common';
import {createLogger, format, Logger, transports} from 'winston';
import {Request} from 'express';
import * as morgan from 'morgan';
import {id} from 'cls-rtracer';
import {config} from '@src/config';

const { combine, timestamp, label, printf, colorize } = format;

const rTracerFormat = printf(({ level, message, label, timestamp }) => {
    const rid = id();
    return rid
        ? `${timestamp} [${label}] ${level}: [request-id: ${rid}] ${message}`
        : `${timestamp} [${label}] ${level}: ${message}`
});

const options = {
    file: {
        level: 'info',
        filename: `${config.log.filepath}/lovechain-master_%DATE%.log`,
        datePattern: 'YYYY-MM-DD-HH',
        handleExceptions: true,
        maxSize: '20m',
        maxFiles: '1d',
        zippedArchive: true,
        format: combine(
            colorize(),
            label({ label: config.server.name }),
            timestamp(),
            rTracerFormat
        )
    },
    console: {
        level: (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === "test") ? 'debug' : 'info',
        handleExceptions: true,
        format: combine(
            colorize(),
            label({ label: config.server.name }),
            timestamp(),
            rTracerFormat
        )
    }
};

@Injectable({ scope: Scope.TRANSIENT })
export class WinstonLogger implements LoggerService {

    private readonly logger: Logger;
    private context: string;

    constructor() {
        this.logger = createLogger({
            exitOnError: false,
            transports: [new transports.Console(options.console)]
        });
        this.context = "";
    }

    public setContext(context: string): WinstonLogger {
        this.context = context;
        return this;
    }

    private setMessage(message: any, requestId?: string): string {
        return this.context ? `${this.context} - ${message}` : `${requestId} - ${message}`;
    }

    public log(message: string, context?: string): any {
        return this.logger.info(this.setMessage(message), { context });
    }

    public logTracer(requestId: string, message: string, context?: string): any {
        return this.logger.info(this.setMessage(message, requestId), { context });
    }

    public error(message: string, trace?: string, context?: string): any {
        return this.logger.error(this.setMessage(message), { trace, context });
    }

    public errorTracer(requestId: string, message: string, trace?: string, context?: string): any {
        return this.logger.error(this.setMessage(message, requestId), { trace, context });
    }

    public warn(message: string, context?: string): any {
        return this.logger.warn(this.setMessage(message), { context });
    }

    public warnTracer(requestId: string, message: string, context?: string): any {
        return this.logger.warn(this.setMessage(message, requestId), { context });
    }

    public debug?(message: string, context?: string): any {
        return this.logger.debug(this.setMessage(message), { context });
    }

    public debugTracer?(requestId: string, message: string, context?: string): any {
        return this.logger.debug(this.setMessage(message, requestId), { context });
    }

    public verbose?(message: string, context?: string): any {
        return this.logger.verbose(this.setMessage(message), { context });
    }

    public verboseTracer?(requestId: string, message: string, context?: string): any {
        return this.logger.verbose(this.setMessage(message, requestId), { context });
    }

    public morganMiddleware(): any {
        morgan.token('requestId', (req) => {
            return (req.headers['lovechain-master-request-id'] as string) || "null";
        });

        return morgan('combined', {
            stream: {
                write: (message: string) => this.log(message),
            },
            skip(req: Request): boolean {
                return req.path == '/ping';
            }
        })
    }
}
