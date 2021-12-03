import {Response} from "express";
import {Controller, Get, Res, Session} from "@nestjs/common";
import {WinstonLogger} from "@src/logger/WinstonLogger";

@Controller('signout')
export class SignOutController {
    constructor(
        private readonly logger: WinstonLogger,
    ) {
        this.logger.setContext('DisputeController');
    }

    @Get('')
    async signOut(
        @Session() session: Record<string, any>,
        @Res() res: Response,
    ): Promise<any> {
        if (!session.adminId || !session.otpVerified) {
            return res.redirect(`/signin`) as any;
        }

        this.logger.log(`signOut request, adminId: ${session.adminId}, adminName: ${session.adminName}`);
        res.clearCookie("connect.sid"); // 세션 쿠키 삭제

        return res.redirect(`/signin`);
    }
}
