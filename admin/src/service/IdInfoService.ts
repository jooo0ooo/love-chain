import {config} from "@src/config";
import {Injectable} from "@nestjs/common";
import {WinstonLogger} from "@src/logger/WinstonLogger";
import { IdInfoRepository } from "@src/repository/client/IdInfoRepository";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { IdInfo } from "@src/model/entity/client/IdInfo";
import { UpdateIdInfoRequest } from "@src/controller/id_info/request/IdInfoRequest";
import { IdInfoStatus } from '@src/model/type/IdInfoType';
import { MemberService } from "@src/service/MemberService";
import { MemberStatus } from "@src/model/type/MemberType";
import { Connection } from "typeorm";
import { MemberRepository } from "@src/repository/client/MemberRepository";
import * as Web3 from 'web3';
import { Eth } from 'web3-eth';
import { WalletInfo } from "@src/model/entity/client/WalletInfo";
import { WalletInfoRepository } from "@src/repository/client/WalletInfoRepository";
import { Builder } from "builder-pattern";
import { v4 as uuidV4 } from "uuid";
import { WalletAsset, WalletEventStatus, WalletEventType, WalletHistoryType } from "@src/model/type/WalletType";
import { WalletHistoryRepository } from "@src/repository/client/WalletHistoryRepository";
import { WalletHistory } from "@src/model/entity/client/WalletHistory";


@Injectable()
export class IdInfoService {

    constructor(
        @InjectRepository(IdInfoRepository, config.db.client.name) private readonly idInfoRepository: IdInfoRepository,
        @InjectRepository(MemberRepository, config.db.client.name) private readonly memberRepository: MemberRepository,
        @InjectRepository(WalletInfoRepository, config.db.client.name) private readonly walletInfoRepository: WalletInfoRepository,
        @InjectRepository(WalletHistoryRepository, config.db.client.name) private readonly walletHistoryRepository: WalletHistoryRepository,

        @InjectConnection(config.db.client.name) private readonly clientConnection: Connection,

        private readonly memberService: MemberService,
        private readonly logger: WinstonLogger,
    ) {
        logger.setContext('IdInfoService');
    }
    
    async getUnApprovalIdListCount(): Promise<number> {
        return this.idInfoRepository.getUnApprovalIdListCount();
    }

    async getUnApprovalIdList(limit: number, offset: number): Promise<IdInfo[]> {
        return this.idInfoRepository.getUnApprovalIdList(limit, offset);
    }

    async getCompletedApprovalIdListCount(): Promise<number> {
        return this.idInfoRepository.getCompletedApprovalIdListCount();
    }
    
    async getCompletedApprovalIdList(limit: number, offset: number): Promise<IdInfo[]> {
        return this.idInfoRepository.getCompletedApprovalIdList(limit, offset);
    }

    async getIdInfo(seq: string): Promise<IdInfo> {
        return this.idInfoRepository.getIdInfo(seq);
    }

    async updateIdInfo(idInfoDto: UpdateIdInfoRequest): Promise<void> {
        await this.clientConnection.transaction(async (manager) => {
            await this.memberRepository.updateMember({
                gender: idInfoDto.gender, 
                birthDate: idInfoDto.birth, 
                uuid: idInfoDto.memberId, 
                status: (idInfoDto.status == IdInfoStatus.APPROVED) 
                    ? MemberStatus.ACTIVE 
                    : MemberStatus.CREATED
            }, manager);
    
            await this.idInfoRepository.updateIdInfo({
                seq: idInfoDto.seq,
                status: idInfoDto.status,
                adminMemo: idInfoDto.adminMemo,
                idNumber: idInfoDto.idNumber
            }, manager);

            const client: Eth = new (Web3 as any)(config.crypto.environment).eth;
    
            const cryptoWallet = client.accounts.create();

            const walletInfo = Builder(WalletInfo)
                .uuid(uuidV4().toString())
                .memberId(idInfoDto.memberId)
                .asset(WalletAsset.LOVE)
                .address(cryptoWallet.address)
                .privateKey(cryptoWallet.privateKey)
                .balance('10')
                .build();

            const wallet = await this.walletInfoRepository.saveWalletInfo(walletInfo, manager);

            const walletHistory = Builder(WalletHistory)
                .asset(WalletAsset.LOVE)
                .memberId(idInfoDto.memberId)
                .walletId(wallet.uuid)
                .type(WalletHistoryType.DEPOSIT)
                .eventId(wallet.memberId)
                .eventType(WalletEventType.REGISTER)
                .eventStatus(WalletEventStatus.DONE)
                .amount('10')
                .feeAmount('0')
                .resultAmount('10')
                .build();

            await this.walletHistoryRepository.saveWalletHistory(walletHistory, manager);


        });
    }
    
}