export interface ErrorResponseData {
    httpStatus: number;
    code: string;
    message: string;
}

export const fromErrorData = (httpStatus: number, code: string, message: string): ErrorResponseData =>
    ({ httpStatus, code, message }) ;

export const ERROR_CODE = {
    // Common
    NOT_FOUND: fromErrorData(404, "ER001", "Not Found"),
    INTERNAL_SERVER_ERROR: fromErrorData(500, "ER002", "Internal Server Error"),
};
