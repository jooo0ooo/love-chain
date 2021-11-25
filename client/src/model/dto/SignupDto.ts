import { v4 as uuidV4} from 'uuid';

export interface SignupDto {
    uuid: string;
    username: string;
    email: string;
    password: string;
    accessToken: string;
}

export const toSignupDto = (username: string, email: string, password: string): SignupDto => {
    return {
        uuid: uuidV4().toString(),
        username: username,
        email: email,
        password: password,
        accessToken: uuidV4().toString()
    }
}