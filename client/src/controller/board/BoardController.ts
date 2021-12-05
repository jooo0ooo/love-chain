import {Response} from "express";
import { Body, Controller, Get, Post, Res, Session } from '@nestjs/common';
import { WinstonLogger } from '@src/logger/WinstonLogger';
import { MemberService } from "@src/service/MemberService";
import { MemberStatus } from "@src/model/type/MemberType";
import { uploadRequest } from "./request/uploadRequest";
import { ApiResponse } from "@src/model/global/ApiResponse";
import { objectToString } from "@src/util/conversion";
import { BoardService } from "@src/service/BoardService";

@Controller()
export class BoardController {
    constructor (
        private readonly memberService: MemberService,
        private readonly boardService: BoardService,
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

    @Post('/write')
    async upload(
        @Session() session: Record<string, any>,
        @Body() body: uploadRequest,
    ): Promise<ApiResponse<null>> {
        this.logger.log(`board upload request, body: ${objectToString(body)}`);

        body.memberId = session.memberUuid;
        body.nickname = session.memberNickname;
        await this.boardService.saveBoard(body);

        return new ApiResponse('0', 'success', null);

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