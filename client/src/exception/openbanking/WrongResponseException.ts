import {ERROR_CODE} from "@src/exception/ErrorCode";
import {CustomException} from "@src/exception/CustomException";

export class WrongResponseException extends CustomException {
    constructor(message?: string, errorData?: unknown, errorCode = ERROR_CODE.WRONG_RESPONSE) {
        super(errorCode, message, errorData);
    }
}
