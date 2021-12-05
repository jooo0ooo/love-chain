import {Response} from "express";
import {Controller, Get, Req, Res, Session} from "@nestjs/common";
import {WinstonLogger} from "@src/logger/WinstonLogger";

@Controller('signout')
export class SignOutController {
    constructor(
        private readonly logger: WinstonLogger,
    ) {
        this.logger.setContext('SignOutController');
    }

    @Get('')
    async signOut(
        @Session() session: Record<string, any>,
        @Res() res: Response,
    ): Promise<any> {
        if (!(session && session.memberSeq && session.memberUuid)) {
            return res.redirect(`/signin`);
        }

        this.logger.log(`signOut request, memberId: ${session.memberUuid}`);
        res.clearCookie("connect.sid");

        return res.redirect(`/signin`);
    }
}
