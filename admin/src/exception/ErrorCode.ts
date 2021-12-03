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
    INVALID_VALUE: fromErrorData(400, "MC003", "Invalid value"),
    INVALID_PARAMETER: fromErrorData(400, "MC004", "Invalid Parameter"),
    LOGIN_NEEDED: fromErrorData(401, "MC005", "login needed"),
};
