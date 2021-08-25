import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMasterDBOrmConfig } from '@src/database/TypeOrmConfig';
import { DatabaseService } from './Databaseservice';
import { Config } from '@src/config';

@Module({})
export class DatabaseModule {
	public static forRoot(config: Config): DynamicModule {
		const ormConfig = getMasterDBOrmConfig(config);
		return {
			module: DatabaseModule,
			imports: [
				TypeOrmModule.forRoot(ormConfig)
			],
			providers: [DatabaseService],
			exports: [DatabaseService]
		}
	}
}