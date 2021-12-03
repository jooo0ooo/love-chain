import {Response} from "express";
import { Controller, Get, Res, Session } from '@nestjs/common';
import { WinstonLogger } from '@src/logger/WinstonLogger';
import { MemberService } from "@src/service/MemberService";
import { MemberStatus } from "@src/model/type/MemberType";

@Controller()
export class BoardController {
    constructor (
        private readonly memberService: MemberService,
        private readonly logger: WinstonLogger
    ) {
        this.logger.setContext('BoardController');
    }

    @Get('/detail')
    detail(
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
        return res.render('detail', {
        });
    }

    @Get('/write')
    async write(
        @Session() session: Record<string, any>,
        @Res() res: Response,
    ): Promise<any> {
        if (!(session && session.memberSeq && session.memberUuid)) {
            return res.redirect(`/signin`);
        }

        const member = await this.memberService.findOneByUuid(session.memberUuid);
        if (member && member.status != MemberStatus.ACTIVE) {
            return res.redirect(`/member/process`);
        }
        
        return res.render('write', {});
    }

    @Get('/my_messages')
    myMessages(
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
        return res.render('my_messages', {
        });
    }
}