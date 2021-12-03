import {config} from "@src/config";
import {Injectable} from "@nestjs/common";
import {WinstonLogger} from "@src/logger/WinstonLogger";
import { IdInfoRepository } from "@src/repository/master/IdInfoRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { IdInfo } from "@src/model/entity/client/IdInfo";
import { UpdateIdInfoRequest } from "@src/controller/id_info/request/IdInfoRequest";
import { IdInfoStatus } from '@src/model/type/IdInfoType';
import { MemberService } from "./MemberService";
import { MemberStatus } from "@src/model/type/MemberType";


@Injectable()
export class IdInfoService {

    constructor(
        @InjectRepository(IdInfoRepository, config.db.client.name) private readonly idInfoRepository: IdInfoRepository,
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
        await this.memberService.updateMember({
            gender: idInfoDto.gender, 
            birthDate: idInfoDto.birth, 
            uuid: idInfoDto.memberId, 
            status: (idInfoDto.status == IdInfoStatus.APPROVED) 
                ? MemberStatus.ACTIVE 
                : MemberStatus.CREATED
        });

        await this.idInfoRepository.updateIdInfo({
            seq: idInfoDto.seq,
            status: idInfoDto.status,
            adminMemo: idInfoDto.adminMemo,
            idNumber: idInfoDto.idNumber
        });
    }

    
}