import { IdInfoStatus } from "@src/model/type/IdInfoType";

export interface UpdateIdInfoDto {
    seq: string;
    status: IdInfoStatus;
    adminMemo: string;
    idNumber: string;
}
