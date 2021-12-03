import {Response} from "express";
import { Controller, Post, Param, Get, Session, Res, UseInterceptors, UploadedFiles, Body } from '@nestjs/common';
import { WinstonLogger } from '@src/logger/WinstonLogger';
import { ApiResponse } from '@src/model/global/ApiResponse';
import { MemberService } from '@src/service/MemberService';
import { hideEmailInfo } from '@src/util/hide';
import { IdInfoService } from "@src/service/IdInfoService";
import { MemberStatus } from "@src/model/type/MemberType";
import { IdInfoStatus } from "@src/model/type/IdInfoType";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { objectToString } from "@src/util/conversion";
import { processRequest } from "./request/processRequest";

@Controller('member')
export class MemberController {
    constructor (
        private readonly memberService: MemberService,
        private readonly idInfoService: IdInfoService,
        private readonly logger: WinstonLogger
    ) {
        this.logger.setContext('MemberController');
    }

    @Post('check/email/:email')
    async isExistEmail(
        @Param('email') email: string
    ): Promise<ApiResponse<null>> {
        this.logger.log(`check email exist, body: ${hideEmailInfo(email)}`);
        if (!await this.memberService.isExistEmail(email)) {
            return new ApiResponse('0', 'not exist', null);
        }

        return new ApiResponse('0', 'exist', null);
    }

    @Post('check/nickname/:nickname')
    async isExistNickname(
        @Param('nickname') nickname: string
    ): Promise<ApiResponse<null>> {
        this.logger.log(`check nickname exist, body: ${nickname}`);
        if (!await this.memberService.isExistNickname(nickname)) {
            return new ApiResponse('0', 'not exist', null);
        }

        return new ApiResponse('0', 'exist', null);
    }

    @Get('/process')
    async process(
        @Session() session: Record<string, any>,
        @Res() res: Response,
    ): Promise<any> {
        if (!(session && session.memberSeq && session.memberUuid)) {
            return res.redirect(`/signin`);
        }

        const member = await this.memberService.findOneByUuid(session.memberUuid);
        if (member && member.status == MemberStatus.ACTIVE) {
            return res.redirect(`/`);
        }

        const idInfo = await this.idInfoService.findIdInfoByMemberId(session.memberUuid);
        if (idInfo && idInfo.status == IdInfoStatus.APPROVED) {
            return res.redirect(`/`);
        }
        
        return res.render('process', {
            memberStatus: member?.status,
            idInfoStatus: idInfo?.status
        });
    }

    @Post('/process')
    @UseInterceptors(AnyFilesInterceptor())
    async processing(
        @Session() session: Record<string, any>,
        @UploadedFiles() file: Express.Multer.File[],
        @Body() body: processRequest,
    ): Promise<ApiResponse<null>> {
        this.logger.log(`signup request, body: ${objectToString(body)}`);
        
        
        await this.idInfoService.updateIdInfoAgain(session.memberUuid, body.idNumber, file[0]);

        return new ApiResponse('0', 'success', null);
    }
}