import { ERROR_CODE } from "@src/exception/ErrorCode";


interface ICustomException {
    httpStatus: number;
    code: string;
    message: string;
}

export class CustomException implements ICustomException{
    message: string;
    httpStatus: number;
    code: string;

    constructor({httpStatus, message, code } = ERROR_CODE.INTERNAL_SERVER_ERROR) {
        this.httpStatus = httpStatus;
        this.message = message;
        this.code = code;
        Object.setPrototypeOf(this, CustomException.prototype);
    }
}
