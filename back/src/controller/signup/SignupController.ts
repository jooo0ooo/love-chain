import { Controller, Post, Session, Body } from '@nestjs/common';
import { WinstonLogger } from '@src/logger/WinstonLogger';
import { ApiResponse } from '@src/model/global/ApiResponse';
import { objectToString } from '@src/util/conversion';
import { pbkdf2Async } from '@src/util/encryption';
import { isValidSignupRequest } from '@src/util/validation';
import {config} from "@src/config";
import { SignUpRequest } from '@src/controller/signup/request/SignUpRequest';
import { toSignupDto } from '@src/model/dto/SignupDto';
import { MemberService } from '@src/service/MemberService';

@Controller('signup')
export class SignupController {
    constructor (
        private readonly memberService: MemberService,
        private readonly logger: WinstonLogger
    ) {
        this.logger.setContext('SignupController');
    }

    @Post('')
    async signup(
        @Session() session: Record<string, any>,
        @Body() body: SignUpRequest,
    ): Promise<ApiResponse<null>> {
        this.logger.log(`signup request, body: ${objectToString(body)}`);
        if (!isValidSignupRequest(body) && 
            await this.memberService.isExistEmail(body.email) || await this.memberService.isExistUsername(body.username)) {
            return new ApiResponse('0', 'invalid data', null);
        }

        const encryptedPassword = await pbkdf2Async(body.password, config.server.passwordSecret);
        const signupDto = toSignupDto(body.username, body.email, encryptedPassword);

        this.logger.log(`member insert, dto: ${objectToString(signupDto)}`);
        await this.memberService.insertMember(signupDto);

        return new ApiResponse('0', 'success', null);
    }
}