import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/AppModule';
import { config, setConfig } from '@src/config';
import {NestExpressApplication} from "@nestjs/platform-express";
import * as MysqlSession from 'express-mysql-session';
import * as session from 'express-session';
import {expressMiddleware as rTracerExpressMiddlewares} from 'cls-rtracer';
import { WinstonLogger } from '@src/logger/WinstonLogger';
import {requestIdMiddleware} from "@src/middleware/RequestIdMiddleware";
import { ErrorsInterceptor } from '@src/interceptor/ErrorsInterceptor';

async function bootstrap() {
    await Promise.all([
        await setConfig()
    ]);

    const winstonLogger = new WinstonLogger().setContext('Main');

    const app = await NestFactory.create<NestExpressApplication>(AppModule.forRoot(config), {
        logger: winstonLogger
    });

    const sessionOptions: MysqlSession.Options = {
        host: config.db.master.host,
        port: config.db.master.port,
        user: config.db.master.username,
        password: config.db.master.password,
        database: config.db.master.dbname,
        expiration: 86400000,
    };
    const MySQLStore = MysqlSession(session);
    const sessionStore = new MySQLStore(sessionOptions);
    app.use(
        session({
            secret: config.server.sessionSecret,
            store: sessionStore,
            resave: false,
            saveUninitialized: false,
        })
    );

    app.use(requestIdMiddleware);

    app.use(rTracerExpressMiddlewares({
        useHeader: true,
        headerName: 'isb-request-id'
    }));
    app.use(winstonLogger.morganMiddleware());
    app.useLogger(winstonLogger);
    app.useGlobalInterceptors(new ErrorsInterceptor());
    
    app.enableCors();
    
    await app.listen(config.server.port, async () => {
        winstonLogger.log(`${config.server.name} is running with port: ${config.server.port}`);
    });
}

bootstrap();
