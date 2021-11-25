export class ApiResponse<DATA> {
    code: string;
    message: string;
    data: DATA;

    constructor(code: string, message: string, data: DATA) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}