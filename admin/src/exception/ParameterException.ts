import {CustomException} from "@src/exception/CustomException";
import {ERROR_CODE} from "@src/exception/ErrorCode";

export class ParameterException extends CustomException {
    constructor(message?: string, logMessage?: string, errorData?: unknown, errorCode = ERROR_CODE.INVALID_PARAMETER) {
        super({
            httpStatus: errorCode.httpStatus,
            code: errorCode.code,
            message: message ? message : errorCode.message
        }, logMessage, errorData);
    }
}
