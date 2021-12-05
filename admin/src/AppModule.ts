import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Config} from '@src/config';
import { IndexController } from '@src/controller/IndexController';
import { DatabaseModule } from '@src/database/DatabaseModule';
import { LoggerModule } from '@src/logger/LoggerModule';
import { AdminMemberController } from './controller/auth/AdminMemberController';
import { SigninController } from './controller/auth/SigninController';
import { SignOutController } from './controller/auth/SignOutController';
import { IdApprovalController } from './controller/id_info/IdInfoController';
import { AdminMemberRepository } from './repository/admin/AdminMemberRepository';
import { IdInfoRepository } from './repository/client/IdInfoRepository';
import { MemberRepository } from './repository/client/MemberRepository';
import { WalletHistoryRepository } from './repository/client/WalletHistoryRepository';
import { WalletInfoRepository } from './repository/client/WalletInfoRepository';
import { AdminMemberService } from './service/AdminMemberService';
import { S3Client } from './service/bucket/S3Client';
import { IdInfoService } from './service/IdInfoService';
import { MemberService } from './service/MemberService';
import { UtilService } from './service/UtilService';

@Module({})
export class AppModule {
    static forRoot(config: Config): DynamicModule {
        return {
            module: AppModule,
            imports: [
                DatabaseModule.forRoot(config),
                TypeOrmModule.forFeature([
                    AdminMemberRepository
                ], config.db.admin.name),
                TypeOrmModule.forFeature([
                    MemberRepository,
                    IdInfoRepository,
                    WalletInfoRepository,
                    WalletHistoryRepository
                ], config.db.client.name),
                LoggerModule,
            ],
            providers: [
                S3Client,
                UtilService,
                AdminMemberService,
                MemberService,
                IdInfoService
            ],
            controllers: [
                IndexController,
                SigninController,
                SignOutController,
                AdminMemberController,
                IdApprovalController
            ]
        }
    }
}
