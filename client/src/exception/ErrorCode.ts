export interface ErrorResponseData {
    httpStatus: number;
    code: string;
    message: string;
}

export const fromErrorData = (httpStatus: number, code: string, message: string): ErrorResponseData =>
    ({ httpStatus, code, message }) ;

export const ERROR_CODE = {
    // Common
    NOT_FOUND: fromErrorData(404, "MC001", "Not Found"),
    INTERNAL_SERVER_ERROR: fromErrorData(500, "MC002", "Internal Server Error"),

    // OpenBanking
    WRONG_RESPONSE: fromErrorData(400, "MO001", "Error Response"),
    STATE_NOT_MATCH: fromErrorData(400, "MO002", "state not match"),
};
