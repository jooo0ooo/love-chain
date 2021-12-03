import {CustomException} from "@src/exception/CustomException";
import {ERROR_CODE} from "@src/exception/ErrorCode";

export class LoginNeededException extends CustomException {
    constructor(message?: string, errorData?: unknown, errorCode = ERROR_CODE.LOGIN_NEEDED) {
        super(errorCode, message, errorData);
    }
}
