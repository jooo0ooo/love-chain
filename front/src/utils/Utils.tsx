import { myAxios } from '@utils/myAxios';

export const isValidEmail = async (email: string | undefined): Promise<boolean> => {
    if (email == undefined) {
        return false;
    }

    const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (emailRegex.test(email)) {
        const res = await myAxios.post('/member/check/email/' + email);
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
    if (username == undefined) {
        return false;
    }
    
    const usernameRegex = /^[A-Za-z]{1}[A-Za-z0-9_-]{3,18}[A-Za-z0-9]{1}$/;
    if (usernameRegex.test(username)) {
        const res = await myAxios.post('/member/check/username/' + username);
        return res.data.message == 'exist' ? false : true;
    }

    return false;
};

export const sleep = (milliseconds: number): Promise<null> => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}