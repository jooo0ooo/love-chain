import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Config } from '@src/config';

export const getClientDBOrmConfig = (config: Config): TypeOrmModuleOptions => {
    return {
        name: config.db.client.name,
        type: config.db.client.type as any,
        database: config.db.client.dbname,
        synchronize: config.db.client.synchronize,
        dropSchema: config.db.client.dropSchema,
        logging: config.db.client.logging,
        host: config.db.client.host,
        port: config.db.client.port,
        username: config.db.client.username,
        password: config.db.client.password,
        entities: [`${__dirname}/../model/entity/client/*{.ts,.js}`,`${__dirname}/../model/entity/client/**/*{.ts,.js}`],
        connectTimeout: config.db.client.connectionTimeout,
        extra: {
            charset: "utf8mb4_general_ci",
            connectionLimit: config.db.client.maximumPoolSize,
        }
    }
};