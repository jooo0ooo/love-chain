import { v4 as uuidV4} from 'uuid';

export interface IdInfoDto {
    uuid: string;
    memberId: string;
    idNumber: string;
    picture: string;
}

export const toIdInfoDto = (memberId: string, idNumber: string, picture: string): IdInfoDto => {
    return {
        uuid: uuidV4().toString(),
        memberId: memberId,
        idNumber: idNumber,
        picture: picture
    }
}