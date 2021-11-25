import {ERROR_CODE} from "@src/exception/ErrorCode";
import {CustomException} from "@src/exception/CustomException";

export class StateNotMatchException extends CustomException {
    constructor(message?: string, errorData?: unknown, errorCode = ERROR_CODE.STATE_NOT_MATCH) {
        super(errorCode, message, errorData);
    }
}
