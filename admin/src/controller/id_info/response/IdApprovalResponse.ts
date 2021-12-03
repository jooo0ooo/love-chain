import { UNASSIGNED } from "@src/constants";
import { Pager } from "@src/model/dto/Pager";
import { IdInfo } from "@src/model/entity/client/IdInfo";
import { IdInfoStatus } from "@src/model/type/IdInfoType";
import { KRTdatetime } from "@src/util/date";
import * as _ from 'lodash';

export interface requestIdApprovalUiModel {
    seq: string;
    memberId?: string;
    createdAt?: string;
    nickname?: string;
    name?: string;
    email?: string;
    nationality?: string;
    birthDate?: string;
    idNumber?: string;
    gender?: string;

    limit: number;
    offset: number;
}

export interface completedIdApprovalUiModel {
    seq: string;
    memberId?: string;
    status: IdInfoStatus;
    createdAt?: string;
    updatedAt?: string;
    nickname?: string;
    email?: string;
    nationality?: string;
    birthDate?: string;
    idNumber?: string;
    gender?: string;
    adminMemo?: string;

    limit: number;
    offset: number;
}

export const toRequestIdApprovalUiModel = (list : IdInfo[], limit : number, offset : number) : requestIdApprovalUiModel[] => {
    return _.map(list, idInfo => {
        return {
            seq: idInfo.seq,
            memberId: idInfo.memberId,
            createdAt: KRTdatetime(idInfo.createdAt),
            nickname: idInfo.member?.nickname,
            name: idInfo.member?.name,
            email: idInfo.member.email,
            nationality: idInfo.member.nationality,
            birthDate: idInfo.member.birthDate,
            idNumber: idInfo.idNumber,
            gender: idInfo.member.gender,

            limit: limit,
            offset: offset
        }
    })
}

export const toCompletedIdApprovalUiModel = (list : IdInfo[], limit : number, offset : number) : completedIdApprovalUiModel[] => {
    return _.map(list, idInfo => {
    
        return {
            seq: idInfo.seq,
            memberId: idInfo.memberId,
            status: idInfo.status,
            createdAt: KRTdatetime(idInfo.createdAt),
            updatedAt: KRTdatetime(idInfo.updatedAt),
            nickname: idInfo.member?.nickname,
            name: idInfo.member?.name,
            email: idInfo.member.email,
            nationality: idInfo.member.nationality,
            birthDate: idInfo.member.birthDate,
            idNumber: idInfo.idNumber,
            gender: idInfo.member.gender,
            adminMemo: idInfo.adminMemo + "",
            
            limit: limit,
            offset: offset
        }
    })
}