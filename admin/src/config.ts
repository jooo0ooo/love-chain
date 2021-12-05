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
        },

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

    aws: {
        s3: {
            baseUri: string;
            publicBucketName: string;
            privateBucketName: string;
        }
    };

    crypto: {
        environment: string;
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
        },

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

    aws: {
        s3: {
            baseUri: process.env.AWS_S3_BASE_URI || '',
            privateBucketName: process.env.AWS_S3_PRIVATE_BUCKET || '',
            publicBucketName: process.env.AWS_S3_PUBLIC_BUCKET || '',
        }
    },

    crypto: {
        environment: process.env.INFURA_URI_WITH_KEY || ''
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

        aws: {
            s3: {
                baseUri: originalConfig.aws.s3.baseUri,
                privateBucketName: originalConfig.aws.s3.privateBucketName,
                publicBucketName: originalConfig.aws.s3.publicBucketName,
            }
        },

        crypto: {
            environment: originalConfig.crypto.environment
        },

        log: {
            filepath: originalConfig.log.filepath,
        },

    }
};