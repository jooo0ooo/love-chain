import { SignUpRequest } from "@src/controller/signup/request/SignUpRequest";

export const isValidEmail = (email: string | undefined): boolean => {
    if (email == undefined) {
        return false;
    }
    const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return emailRegex.test(email);
};

export const isValidPwd = (pwd: string | undefined): boolean => {
    if (pwd == undefined) {
        return false;
    }
    const pwdRegex = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;
    return pwdRegex.test(pwd);
};

export const isValidUsername = (username: string | undefined): boolean => {
    if (username == undefined || username.length < 4) {
        return false;
    }
    return true;
};

export const isValidSignupRequest = (signupRequest: SignUpRequest): boolean => {
    return isValidEmail(signupRequest.email) && isValidPwd(signupRequest.password) && isValidUsername(signupRequest.username);
}