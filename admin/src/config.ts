import * as dotenv from 'dotenv';
import * as _ from 'lodash';

dotenv.config();

export type Config = {
    server: {
        port: string;
        name: string;
        sessionSecret: string;
        passwordSecret: string;
    };

    db: {
        admin: {
            name: string;
            type: string;
            username: string;
            password: string;
            dbname: string;
            host: string;
            port: number;
            maximumPoolSize: number;
            connectionTimeout: number;
            synchronize: boolean;
            logging: boolean;
            dropSchema: boolean;
        }
    };

    log: {
        filepath: string;
    };
}

export let config: Config = {
    server: {
        port: process.env.PORT || "3333",
        name: process.env.SERVER_NAME || "lovechain-admin",
        sessionSecret: process.env.SESSION_SECRET || "session-secret",
        passwordSecret: process.env.PASSWORD_SECRET || "password-secret",
    },

    db: {
        admin: {
            name: process.env.DB_ADMIN_CON_NAME || 'admin',
            type: process.env.DB_ADMIN_TYPE || 'mysql',
            username: process.env.DB_ADMIN_USERNAME || "",
            password: process.env.DB_ADMIN_PASSWORD || "",
            dbname: process.env.DB_ADMIN_DB_NAME ||"",
            host: process.env.DB_ADMIN_HOST || "127.0.0.1",
            port: process.env.DB_ADMIN_PORT ? parseInt(process.env.DB_ADMIN_PORT) : 3306,
            maximumPoolSize: process.env.DB_ADMIN_MAXIMUM_POOL_SIZE ? parseInt(process.env.DB_ADMIN_MAXIMUM_POOL_SIZE) : 5,
            connectionTimeout: process.env.DB_ADMIN_CONNECTION_TIMEOUT ? parseInt(process.env.DB_ADMIN_CONNECTION_TIMEOUT) : 10000,
            synchronize: process.env.DB_ADMIN_SYNCHRONIZE === 'true',
            logging: process.env.DB_ADMIN_LOGGING === 'true',
            dropSchema: process.env.DB_ADMIN_DROP_SCHEMA === 'true',
        }
    },

    log: {
        filepath: process.env.LOG_FILE_PATH || "/data/lovechain-admin/logs"
    }
};

export const setConfig = async (): Promise<void> => {
    const originalConfig = _.cloneDeep(config);
    config = {
        server: {
            port: originalConfig.server.port,
            name: originalConfig.server.name,
            sessionSecret: originalConfig.server.sessionSecret,
            passwordSecret: originalConfig.server.passwordSecret,
        },

        db: {
            admin: {
                name: originalConfig.db.admin.name,
                type: originalConfig.db.admin.type,
                username: originalConfig.db.admin.username,
                password: originalConfig.db.admin.password,
                dbname: originalConfig.db.admin.dbname,
                host: originalConfig.db.admin.host,
                port: originalConfig.db.admin.port,
                maximumPoolSize: originalConfig.db.admin.maximumPoolSize,
                connectionTimeout: originalConfig.db.admin.connectionTimeout,
                synchronize: originalConfig.db.admin.synchronize,
                logging: originalConfig.db.admin.logging,
                dropSchema: originalConfig.db.admin.dropSchema,
            },
        },

        log: {
            filepath: originalConfig.log.filepath,
        },

    }
};