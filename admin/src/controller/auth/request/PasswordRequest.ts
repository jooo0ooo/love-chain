import {IsNotEmpty, IsString} from "class-validator";

export class PasswordCheckRequest {
    @IsString({
        message: "password cannot be found or invalid type"
    })
    @IsNotEmpty({
        message: "password cannot be found or invalid type"
    })
    currentPassword!: string;

    @IsString({
        message: "password cannot be found or invalid type"
    })
    @IsNotEmpty({
        message: "password cannot be found or invalid type"
    })
    password!: string;
}
