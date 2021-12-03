import { IdInfoStatus } from "@src/model/type/IdInfoType";

export interface UpdateIdInfoRequest {
    seq: string;
    status: IdInfoStatus;
    adminMemo: string;
    memberId: string;
     
    gender: string;
    birth: string;
    idNumber: string;
}