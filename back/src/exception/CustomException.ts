import { ERROR_CODE } from "./ErrorCode";

export interface ICustomException extends Error {
    httpStatus: number;
    code: string;
    message: string;
    internalMessage?: string;
    errorData?: unknown;
    toString(): string;
}

export class CustomException implements ICustomException{
    name: string;
    message: string;
    internalMessage?: string;
    httpStatus: number;
    code: string;
    stack?: string;
    errorData?: unknown;

    constructor(
        {httpStatus, message, code } = ERROR_CODE.INTERNAL_SERVER_ERROR,
        internalMessage?: string,
        errorData?: any,
        stack?: string,
    ) {
        if (stack) {
            this.stack = stack;
        } else if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
        this.httpStatus = httpStatus;
        this.message = message;
        this.name = code;
        this.code = code;
        this.internalMessage = internalMessage;
        this.errorData = errorData;
        Object.setPrototypeOf(this, CustomException.prototype);
    }

    public toString(): string {
        return JSON.stringify(this);
    }
}