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
import { S3Client } from './service/bucket/S3Client';
import { UtilService } from './service/UtilService';
import { IdInfoRepository } from './repository/client/IdInfoRepository';
import { IdInfoService } from './service/IdInfoService';
import { BoardController } from './controller/board/BoardController';

@Module({})
export class AppModule {
    static forRoot(config: Config): DynamicModule {
        return {
            module: AppModule,
            imports: [
                DatabaseModule.forRoot(config),
                TypeOrmModule.forFeature([
                    MemberRepository,
                    IdInfoRepository,
                    ObAuthLogRepository,
                    ObTokenRepository,
                ], config.db.client.name),
                LoggerModule,
            ],
            providers: [
                S3Client,

                MemberService,
                IdInfoService,
                OpenBankingService,
                UtilService
            ],
            controllers: [
                IndexController,
                SignupController,
                SigninController,
                MemberController,
                BoardController,
                OpenBankingController
            ]
        }
    }
}
