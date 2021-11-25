import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getClientDBOrmConfig } from '@src/database/TypeOrmConfig';
import { DatabaseService } from '@src/database/Databaseservice';
import { Config } from '@src/config';

@Module({})
export class DatabaseModule {
    public static forRoot(config: Config): DynamicModule {
        const clientOrmConfig = getClientDBOrmConfig(config);
        return {
            module: DatabaseModule,
            imports: [
                TypeOrmModule.forRoot(clientOrmConfig)
            ],
            providers: [DatabaseService],
            exports: [DatabaseService]
        }
    }
}