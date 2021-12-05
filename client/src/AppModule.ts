import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Config} from '@src/config';
import { IndexController } from '@src/controller/IndexController';
import { DatabaseModule } from '@src/database/DatabaseModule';
import { SignupController } from '@src/controller/signup/SignupController';
import { LoggerModule } from '@src/logger/LoggerModule';
import { MemberRepository } from '@src/repository/client/MemberRepository';
import { MemberService } from '@src/service/MemberService';
import { BoardController } from '@src/controller/board/BoardController';
import { MemberController } from '@src/controller/member/MemberController';
import { SigninController } from '@src/controller/signin/SigninController';
import { OpenBankingService } from '@src/service/OpenBankingService';
import { OpenBankingController } from '@src/controller/openbanking/OpenBankingController';
import { ObAuthLogRepository } from '@src/repository/client/openbanking/ObAuthLogRepository';
import { ObTokenRepository } from '@src/repository/client/openbanking/ObTokenRepository';
import { S3Client } from '@src/service/bucket/S3Client';
import { UtilService } from '@src/service/UtilService';
import { IdInfoRepository } from '@src/repository/client/IdInfoRepository';
import { IdInfoService } from '@src/service/IdInfoService';
import { WalletInfoRepository } from '@src/repository/client/WalletInfoRepository';
import { WalletHistoryRepository } from '@src/repository/client/WalletHistoryRepository';
import { WalletService } from '@src/service/WalletService';
import { LvPinRepository } from './repository/client/LvPinRepository';
import { SignOutController } from './controller/SignOutController';
import { BoardRepository } from './repository/client/BoardRepository';
import { BoardService } from './service/BoardService';

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
                    WalletInfoRepository,
                    WalletHistoryRepository,
                    LvPinRepository,
                    BoardRepository
                ], config.db.client.name),
                LoggerModule,
            ],
            providers: [
                S3Client,

                MemberService,
                IdInfoService,
                OpenBankingService,
                WalletService,
                UtilService,
                BoardService
            ],
            controllers: [
                IndexController,
                SignupController,
                SignOutController,
                SigninController,
                MemberController,
                BoardController,
                OpenBankingController
            ]
        }
    }
}
