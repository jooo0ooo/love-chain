import { DynamicModule, Module } from '@nestjs/common';
import {Config} from '@src/config';
import { IndexController } from '@src/controller/IndexController';
import { DatabaseModule } from '@src/database/DatabaseModule';

@Module({})
export class AppModule {
    static forRoot(config: Config): DynamicModule {
        return {
            module: AppModule,
            imports: [
                DatabaseModule.forRoot(config)
            ],
            providers: [
            ],
            controllers: [
                IndexController
            ]
        }
    }
}
