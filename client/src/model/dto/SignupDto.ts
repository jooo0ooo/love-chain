import { SignUpRequest } from '@src/controller/signup/request/SignUpRequest';
import { v4 as uuidV4} from 'uuid';

export interface SignupDto {
    uuid: string;
    name: string;
    gender: string;
    birthDate: string;
    nationality: string;
    phone: string;
    nickname: string;
    password: string;
    email: string;
    idNumber: string;
    accessToken: string;
}

export const toSignupDto = (requestDto: SignUpRequest, encryptedPassword: string, ): SignupDto => {
    return {
        uuid: uuidV4().toString(),
        name: requestDto.name,
        gender: requestDto.gender,
        birthDate: requestDto.birthDate,
        nationality: requestDto.nationality,
        phone: requestDto.phone,
        nickname: requestDto.nickname,
        password: encryptedPassword,
        email: requestDto.email,
        idNumber: requestDto.idNumber,
        accessToken: uuidV4().toString()
    }
}