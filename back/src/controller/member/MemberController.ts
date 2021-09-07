import { Controller, Post, Param } from '@nestjs/common';
import { WinstonLogger } from '@src/logger/WinstonLogger';
import { ApiResponse } from '@src/model/global/ApiResponse';
import { MemberService } from '@src/service/MemberService';
import { hideEmailInfo } from '@src/util/hide';

@Controller('member')
export class MemberController {
    constructor (
        private readonly memberService: MemberService,
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

    @Post('check/username/:email')
    async isExistUsername(
        @Param('email') username: string
    ): Promise<ApiResponse<null>> {
        this.logger.log(`check username exist, body: ${username}`);
        if (!await this.memberService.isExistUsername(username)) {
            return new ApiResponse('0', 'not exist', null);
        }

        return new ApiResponse('0', 'exist', null);
    }
}