import * as dotenv from 'dotenv';

dotenv.config();

export type Config = {
    server: {
        port: string;
        name: string;
    };

    jwt: {
        secret: string;
        expiresIn: string;
        iss: string;
    };

    db: {
        master: {
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

export const config: Config = {
    server: {
        port: process.env.PORT || "3000",
        name: process.env.SERVER_NAME || "buttercup-admin",
    },

    jwt: {
        secret: process.env.JWT_SECRET || '',
        expiresIn: process.env.JWT_EXPIRATION || "7d",
        iss: process.env.JWT_ISS || "accounts.gameper.io"
    },

    db: {
        master: {
            type: process.env.DB_MASTER_TYPE || 'mysql',
            username: process.env.DB_MASTER_USERNAME || "",
            password: process.env.DB_MASTER_PASSWORD || "",
            dbname: process.env.DB_MASTER_DB_NAME ||"",
            host: process.env.DB_MASTER_HOST || "127.0.0.1",
            port: process.env.DB_MASTER_PORT ? parseInt(process.env.DB_MASTER_PORT) : 3306,
            maximumPoolSize: process.env.DB_MASTER_MAXIMUM_POOL_SIZE ? parseInt(process.env.DB_MASTER_MAXIMUM_POOL_SIZE) : 10,
            connectionTimeout: process.env.DB_MASTER_CONNECTION_TIMEOUT ? parseInt(process.env.DB_MASTER_CONNECTION_TIMEOUT) : 10000,
            synchronize: process.env.DB_MASTER_SYNCHRONIZE === 'true',
            logging: process.env.DB_MASTER_LOGGING === 'true',
            dropSchema: process.env.DB_MASTER_DROP_SCHEMA === 'true',
        }
    },
    
    log: {
        filepath: process.env.LOG_FILE_PATH || "/data/buttercup-admin/logs"
    },
};
