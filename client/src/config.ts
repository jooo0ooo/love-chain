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
        client: {
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
        name: process.env.SERVER_NAME || "lovechain-client",
        sessionSecret: process.env.SESSION_SECRET || "session-secret",
        passwordSecret: process.env.PASSWORD_SECRET || "password-secret",
    },

    db: {
        client: {
            name: process.env.DB_CLIENT_CON_NAME || 'client',
            type: process.env.DB_CLIENT_TYPE || 'mysql',
            username: process.env.DB_CLIENT_USERNAME || "",
            password: process.env.DB_CLIENT_PASSWORD || "",
            dbname: process.env.DB_CLIENT_DB_NAME ||"",
            host: process.env.DB_CLIENT_HOST || "127.0.0.1",
            port: process.env.DB_CLIENT_PORT ? parseInt(process.env.DB_CLIENT_PORT) : 3306,
            maximumPoolSize: process.env.DB_CLIENT_MAXIMUM_POOL_SIZE ? parseInt(process.env.DB_CLIENT_MAXIMUM_POOL_SIZE) : 5,
            connectionTimeout: process.env.DB_CLIENT_CONNECTION_TIMEOUT ? parseInt(process.env.DB_CLIENT_CONNECTION_TIMEOUT) : 10000,
            synchronize: process.env.DB_CLIENT_SYNCHRONIZE === 'true',
            logging: process.env.DB_CLIENT_LOGGING === 'true',
            dropSchema: process.env.DB_CLIENT_DROP_SCHEMA === 'true',
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
        filepath: process.env.LOG_FILE_PATH || "/data/lovechain-client/logs"
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
            client: {
                name: originalConfig.db.client.name,
                type: originalConfig.db.client.type,
                username: originalConfig.db.client.username,
                password: originalConfig.db.client.password,
                dbname: originalConfig.db.client.dbname,
                host: originalConfig.db.client.host,
                port: originalConfig.db.client.port,
                maximumPoolSize: originalConfig.db.client.maximumPoolSize,
                connectionTimeout: originalConfig.db.client.connectionTimeout,
                synchronize: originalConfig.db.client.synchronize,
                logging: originalConfig.db.client.logging,
                dropSchema: originalConfig.db.client.dropSchema,
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