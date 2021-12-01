import {Response} from "express";
import { Controller, Post, Session, Body, Get, Res } from '@nestjs/common';
import { WinstonLogger } from '@src/logger/WinstonLogger';
import { ApiResponse } from '@src/model/global/ApiResponse';
import { pbkdf2Async } from '@src/util/encryption';
import {config} from "@src/config";
import { MemberService } from '@src/service/MemberService';
import { SignInRequest } from '@src/controller/signin/request/SignInRequest';
import { hideEmailInfo } from '@src/util/hide';

@Controller('signin')
export class SigninController {
    constructor (
        private readonly memberService: MemberService,
        private readonly logger: WinstonLogger
    ) {
        this.logger.setContext('SigninController');
    }

    @Post('')
    async signin(
        @Session() session: Record<string, any>,
        @Body() body: SignInRequest,
    ): Promise<ApiResponse<null>> {
        this.logger.log(`signin request, email/nickname: ${body.userId}`);
        
        const member = (body.userId.includes("@")) 
            ? await this.memberService.findOneByEmail(body.userId) 
            : await this.memberService.findOneByNickname(body.userId)
        
        if (!member) {
            this.logger.error(`cannot find member info: ${body.userId}`);
            return new ApiResponse('0', 'failed', null);
        }

        const encryptedPassword = await pbkdf2Async(body.password, config.server.passwordSecret);
        if (member.password != encryptedPassword) {
            return new ApiResponse('0', 'failed', null);
        }

        session.memberSeq = member.seq;
        session.memberUuid = member.uuid;
        session.memberName = member.name;
        session.memberNickname = member.nickname;
        session.memberEmail = member.email;

        return new ApiResponse('0', 'success', null);
    }

    @Get('')
    index(
        @Session() session: Record<string, any>,
        @Res() res: Response,
    ): void {
        /*
        if (session && session.adminId && session.otpVerified) {
            if(session.passwordExpired) { 
                return res.redirect(`/manage_admin_member/password`);
            } else {
                return res.redirect(`/home`);
            }
        }
        */
        return res.render('signin', {
            
        });
    }

    @Get('check')
    async checkSignin(
        @Session() session: Record<string, any>,
        @Res() res: Response,
    ): Promise<any> {
        this.logger.log(`check sign in exist`);
        let flag = false;
        if (session && session.memberUuid) {
            flag = true;
        }

        console.log(flag);
        console.log(session.memberName);
        console.log(session.memberNickname);
        console.log(session.memberEmail);
        
        return res.end('{"success":' + flag + ', "name": "' + session.memberName + '", "nickname": "' + session.memberNickname + '", "email": "' + session.memberEmail + '"}');
    }
}