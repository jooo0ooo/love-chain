import {Response} from "express";
import {Body, Controller, Get, Param, Post, Req, Res, Session} from "@nestjs/common";
import {WinstonLogger} from "@src/logger/WinstonLogger";
import {config} from "@src/config";
import {hideEmailInfo} from "@src/util/hide";
import {pbkdf2Async} from "@src/util/encryption";
import { AdminMemberService } from "@src/service/AdminMemberService";
import { UtilService } from "@src/service/UtilService";
import { PasswordCheckRequest } from "@src/controller/auth/request/PasswordRequest";

@Controller('manage_admin_member')
export class AdminMemberController {
    constructor(
        private readonly utilService: UtilService,
        private readonly adminMemberService: AdminMemberService,
        private readonly logger: WinstonLogger,
        
    ) {
        this.logger.setContext('PasswordController');
    }

    @Get('/password')
    index(
        @Session() session: Record<string, any>,
        @Res() res: Response,
    ): void {
        if (!session.adminId || !session.otpVerified) {
            return res.redirect(`/signin`) as any;
        }
        return res.render('change_password', {passwordExpired : session.passwordExpired});
    }

    @Post('/password/check')
    async checkCurrentPassword(
        @Session() session: Record<string, any>,
        @Body() body: PasswordCheckRequest,
        @Res() res: Response,
    ): Promise<any> {
        this.logger.log(`Password check request`);

        const adminMember = await this.adminMemberService.findOneByEmail(session.adminEmail);

        if (!adminMember) {
            this.logger.error(`cannot find admin member email: ${hideEmailInfo(session.adminEmail)}`);
            const data = {'success' : false, 'message' : "해당 회원이 존재하지 않습니다."};
            return res.json(JSON.stringify(data));
        }

        const encryptedCurrentPassword = await pbkdf2Async(body.currentPassword, config.server.passwordSecret);
        if (adminMember.password !== encryptedCurrentPassword) {
            this.logger.error(`password is invalid email: ${hideEmailInfo(session.adminEmail)}`);
            const data = {'success' : false, 'message' : "현재 비밀번호가 일치하지 않습니다."};
            return res.json(JSON.stringify(data));
        }

        const encryptedPassword = await pbkdf2Async(body.password, config.server.passwordSecret);

        if (encryptedPassword == adminMember.password) {
            this.logger.error(`new password is same as the previous password`);
            const data = {'success' : false, 'message' : "이전 비밀번호와 다른 비밀번호로 변경해주십시오."};
            return res.json(JSON.stringify(data));
        }

        const data = {'success' : true}
        return res.json(JSON.stringify(data));
    }

    @Post('/password/change/:userToken')
    async changePassword(
        @Session() session: Record<string, any>,
        @Param('userToken') userToken: string,
        @Body('password') body: string,
        @Res() res: Response,
    ): Promise<void> {
        const otpVerified = await this.utilService.checkOtp(userToken, session.otpSecret);
        
        if (otpVerified === true) {
            const encryptedPassword = await pbkdf2Async(body, config.server.passwordSecret);      
            await this.adminMemberService.changePassword(session.adminEmail, encryptedPassword);
            res.clearCookie("connect.sid"); // 세션 쿠키 삭제

            this.logger.log(`password is changed and log out, adminId: ${session.adminId}, adminName: ${session.adminName}`);
            return res.end('{"success": true}');
        }

        return res.end('{"success": false}');
    }
}
