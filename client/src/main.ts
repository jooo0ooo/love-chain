import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/AppModule';
import { config, setConfig } from '@src/config';
import {NestExpressApplication} from "@nestjs/platform-express";
import * as MysqlSession from 'express-mysql-session';
import * as session from 'express-session';
import { join } from 'path';
import * as exphbs from "express-handlebars";
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
        host: config.db.client.host,
        port: config.db.client.port,
        user: config.db.client.username,
        password: config.db.client.password,
        database: config.db.client.dbname,
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

    app.useStaticAssets(join(__dirname, '..', 'public'), { etag: false, prefix: '/public' });
    app.setBaseViewsDir(join(__dirname, '..', 'view'));
    app.engine(
        "hbs",
        exphbs({
            //helpers: hbsHelper,
            extname: "hbs",
        })
    );
    
    app.setViewEngine('hbs');

    app.use(requestIdMiddleware);

    app.use(rTracerExpressMiddlewares({
        useHeader: true,
        headerName: 'lovechain-client-request-id'
    }));
    app.use(winstonLogger.morganMiddleware());
    app.useLogger(winstonLogger);
    app.useGlobalInterceptors(new ErrorsInterceptor());
    
    app.enableCors({origin: true, credentials: true});
    
    await app.listen(config.server.port, async () => {
        winstonLogger.log(`${config.server.name} is running with port: ${config.server.port}`);
    });
}

bootstrap();
