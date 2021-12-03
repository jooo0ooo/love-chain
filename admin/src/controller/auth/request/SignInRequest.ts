import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class SignInRequest {
    @IsEmail(undefined, {
        message: "email cannot be found or invalid type"
    })
    email!: string;

    @IsString({
        message: "password cannot be found or invalid type"
    })
    @IsNotEmpty({
        message: "password cannot be found or invalid type"
    })
    password!: string;
}
