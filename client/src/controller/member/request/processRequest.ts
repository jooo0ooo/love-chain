import { IdInfoStatus } from "@src/model/type/IdInfoType";

export class processRequest {
    idNumber!: string;
}

export interface UpdateIdInfoDto {
    status: IdInfoStatus;
    picture: string;
    idNumber: string;
    memberId: string;
}