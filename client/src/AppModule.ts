import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Config} from '@src/config';
import { IndexController } from '@src/controller/IndexController';
import { DatabaseModule } from '@src/database/DatabaseModule';
import { SignupController } from '@src/controller/signup/SignupController';
import { LoggerModule } from '@src/logger/LoggerModule';
import { MemberRepository } from '@src/repository/client/MemberRepository';
import { MemberService } from '@src/service/MemberService';
import { MemberController } from './controller/member/MemberController';
import { SigninController } from './controller/signin/SigninController';
import { OpenBankingService } from './service/OpenBankingService';
import { OpenBankingController } from './controller/openbanking/OpenBankingController';
import { ObAuthLogRepository } from './repository/client/openbanking/ObAuthLogRepository';
import { ObTokenRepository } from './repository/client/openbanking/ObTokenRepository';

@Module({})
export class AppModule {
    static forRoot(config: Config): DynamicModule {
        return {
            module: AppModule,
            imports: [
                DatabaseModule.forRoot(config),
                TypeOrmModule.forFeature([
                    MemberRepository,
                    ObAuthLogRepository,
                    ObTokenRepository,
                ], config.db.client.name),
                LoggerModule,
            ],
            providers: [
                MemberService,
                OpenBankingService
            ],
            controllers: [
                IndexController,
                SignupController,
                SigninController,
                MemberController,
                OpenBankingController
            ]
        }
    }
}
