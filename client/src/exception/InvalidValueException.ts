import {CustomException} from "@src/exception/CustomException";
import {ERROR_CODE} from "@src/exception/ErrorCode";

export class InvalidValueException extends CustomException {
    constructor(message?: string, errorData?: unknown, errorCode = ERROR_CODE.INVALID_VALUE) {
        super(errorCode, message, errorData);
    }
}
