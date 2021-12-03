import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getAdminDBOrmConfig, getClientDBOrmConfig } from '@src/database/TypeOrmConfig';
import { DatabaseService } from '@src/database/Databaseservice';
import { Config } from '@src/config';

@Module({})
export class DatabaseModule {
    public static forRoot(config: Config): DynamicModule {
        const adminOrmConfig = getAdminDBOrmConfig(config);
        const clientOrmConfig = getClientDBOrmConfig(config);
        return {
            module: DatabaseModule,
            imports: [
                TypeOrmModule.forRoot(adminOrmConfig),
                TypeOrmModule.forRoot(clientOrmConfig)
            ],
            providers: [DatabaseService],
            exports: [DatabaseService]
        }
    }
}