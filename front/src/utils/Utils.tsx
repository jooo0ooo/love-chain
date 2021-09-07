import { customAxios } from '@src/utils/CustomAxios';

export const isValidEmail = async (email: string | undefined): Promise<boolean> => {
    if (email == undefined) {
        return false;
    }

    const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (emailRegex.test(email)) {
        const res = await customAxios.post('/member/check/email/' + email);
        return res.data.message == 'exist' ? false : true;
    }

    return false;
};

export const isValidPwd = (pwd: string | undefined): boolean => {
    if (pwd == undefined) {
        return false;
    }
    const pwdRegex = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;
    return pwdRegex.test(pwd);
};

export const isValidUsername = async (username: string | undefined): Promise<boolean> => {
    if (username == undefined || username.length < 4) {
        return false;
    }

    const res = await customAxios.post('/member/check/username/' + username);
    return res.data.message == 'exist' ? false : true;
};

export const sleep = (milliseconds: number): Promise<null> => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}