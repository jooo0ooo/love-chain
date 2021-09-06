import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Config } from '@src/config';

export const getMasterDBOrmConfig = (config: Config): TypeOrmModuleOptions => {
    return {
        type: config.db.master.type as any,
        database: config.db.master.dbname,
        synchronize: config.db.master.synchronize,
        dropSchema: config.db.master.dropSchema,
        logging: config.db.master.logging,
        host: config.db.master.host,
        port: config.db.master.port,
        username: config.db.master.username,
        password: config.db.master.password,
        entities: [`${__dirname}/../entity/master/*{.ts,.js}`],
        connectTimeout: config.db.master.connectionTimeout,
        extra: {
            charset: "utf8mb4_general_ci",
            connectionLimit: config.db.master.maximumPoolSize,
        }
    }
};
