import {Response} from "express";
import { Controller, Post, Session, Body, Get, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { WinstonLogger } from '@src/logger/WinstonLogger';
import { ApiResponse } from '@src/model/global/ApiResponse';
import { objectToString } from '@src/util/conversion';
import { pbkdf2Async } from '@src/util/encryption';
import { isValidSignupRequest } from '@src/util/validation';
import {config} from "@src/config";
import { SignUpRequest } from '@src/controller/signup/request/SignUpRequest';
import { toSignupDto } from '@src/model/dto/SignupDto';
import { MemberService } from '@src/service/MemberService';
import { AnyFilesInterceptor } from "@nestjs/platform-express";

@Controller('signup')
export class SignupController {
    constructor (
        private readonly memberService: MemberService,
        private readonly logger: WinstonLogger
    ) {
        this.logger.setContext('SignupController');
    }

    @Post('')
    @UseInterceptors(AnyFilesInterceptor())
    async signup(
        @Session() session: Record<string, any>,
        @UploadedFiles() file: Express.Multer.File[],
        @Body() body: SignUpRequest,
    ): Promise<ApiResponse<null>> {
        this.logger.log(`signup request, body: ${objectToString(body)}`);
        if (!isValidSignupRequest(body) && 
            await this.memberService.isExistEmail(body.email) || await this.memberService.isExistNickname(body.nickname)) {
            return new ApiResponse('0', 'invalid data', null);
        }
        const encryptedPassword = await pbkdf2Async(body.password, config.server.passwordSecret);
        const encryptedIdNumber = await pbkdf2Async(body.idNumber, config.server.passwordSecret);
        await this.memberService.createMember(toSignupDto(body, encryptedPassword, encryptedIdNumber), file[0]);

        return new ApiResponse('0', 'success', null);
    }

    @Get('')
    step1(
        @Session() session: Record<string, any>,
        @Res() res: Response,
    ): void {
        if (session && session.memberSeq && session.memberUuid) {
            return res.redirect(`/`);
        }

        return res.render('signup', {});
    }
}