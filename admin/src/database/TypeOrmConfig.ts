import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Config } from '@src/config';

export const getAdminDBOrmConfig = (config: Config): TypeOrmModuleOptions => {
    return {
        name: config.db.admin.name,
        type: config.db.admin.type as any,
        database: config.db.admin.dbname,
        synchronize: config.db.admin.synchronize,
        dropSchema: config.db.admin.dropSchema,
        logging: config.db.admin.logging,
        host: config.db.admin.host,
        port: config.db.admin.port,
        username: config.db.admin.username,
        password: config.db.admin.password,
        entities: [`${__dirname}/../model/entity/admin/*{.ts,.js}`,`${__dirname}/../model/entity/admin/**/*{.ts,.js}`],
        connectTimeout: config.db.admin.connectionTimeout,
        extra: {
            charset: "utf8mb4_general_ci",
            connectionLimit: config.db.admin.maximumPoolSize,
        }
    }
};