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
        master: {
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

    openbanking: {
        common: {
            key: string;
            secret: string;
        },
        url: {
            redirectUri: string;
            authUri: string;
            tokenUri: string;
        }

    }

    log: {
        filepath: string;
    };
}

export let config: Config = {
    server: {
        port: process.env.PORT || "3139",
        name: process.env.SERVER_NAME || "lovechain-master",
        sessionSecret: process.env.SESSION_SECRET || "session-secret",
        passwordSecret: process.env.PASSWORD_SECRET || "password-secret",
    },

    db: {
        master: {
            name: process.env.DB_MASTER_CON_NAME || 'master',
            type: process.env.DB_MASTER_TYPE || 'mysql',
            username: process.env.DB_MASTER_USERNAME || "",
            password: process.env.DB_MASTER_PASSWORD || "",
            dbname: process.env.DB_MASTER_DB_NAME ||"",
            host: process.env.DB_MASTER_HOST || "127.0.0.1",
            port: process.env.DB_MASTER_PORT ? parseInt(process.env.DB_MASTER_PORT) : 3306,
            maximumPoolSize: process.env.DB_MASTER_MAXIMUM_POOL_SIZE ? parseInt(process.env.DB_MASTER_MAXIMUM_POOL_SIZE) : 5,
            connectionTimeout: process.env.DB_MASTER_CONNECTION_TIMEOUT ? parseInt(process.env.DB_MASTER_CONNECTION_TIMEOUT) : 10000,
            synchronize: process.env.DB_MASTER_SYNCHRONIZE === 'true',
            logging: process.env.DB_MASTER_LOGGING === 'true',
            dropSchema: process.env.DB_MASTER_DROP_SCHEMA === 'true',
        }
    },

    openbanking: {
        common: {
            key: process.env.OB_API_KEY || '',
            secret: process.env.OB_TOKEN_KEY || '',
        },
        url: {
            redirectUri: process.env.OB_REDIRECT_URI || '',
            authUri: process.env.OB_AUTH_URI || '',
            tokenUri: process.env.OB_TOKEN_URI || '',
        }
    },

    log: {
        filepath: process.env.LOG_FILE_PATH || "/data/lovechain-master/logs"
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
            master: {
                name: originalConfig.db.master.name,
                type: originalConfig.db.master.type,
                username: originalConfig.db.master.username,
                password: originalConfig.db.master.password,
                dbname: originalConfig.db.master.dbname,
                host: originalConfig.db.master.host,
                port: originalConfig.db.master.port,
                maximumPoolSize: originalConfig.db.master.maximumPoolSize,
                connectionTimeout: originalConfig.db.master.connectionTimeout,
                synchronize: originalConfig.db.master.synchronize,
                logging: originalConfig.db.master.logging,
                dropSchema: originalConfig.db.master.dropSchema,
            },
        },

        openbanking: {
            common: {
                key: originalConfig.openbanking.common.key,
                secret: originalConfig.openbanking.common.secret,
            },
            url: {
                redirectUri: originalConfig.openbanking.url.redirectUri,
                authUri: originalConfig.openbanking.url.authUri,
                tokenUri: originalConfig.openbanking.url.tokenUri,
            }
        },

        log: {
            filepath: originalConfig.log.filepath,
        },

    }
};