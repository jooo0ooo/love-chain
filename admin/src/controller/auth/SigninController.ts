import {Response} from "express";
import { Body, Controller, Get, Param, Post, Req, Res, Session } from '@nestjs/common';
import {config} from "@src/config";
import { WinstonLogger } from '@src/logger/WinstonLogger';
import { hideEmailInfo } from "@src/util/hide";
import { SignInRequest } from "@src/controller/auth/request/SignInRequest";
import { AdminMemberRepository } from "@src/repository/admin/AdminMemberRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminStatus } from "@src/model/type/AdminType";
import {pbkdf2Async} from "@src/util/encryption";
import {GeneratedSecret} from "speakeasy"
import { UtilService } from "@src/service/UtilService";
import { now } from "moment";

@Controller('signin')
export class SigninController {
    constructor (
        @InjectRepository(AdminMemberRepository, config.db.admin.name) private readonly adminMemberRepository: AdminMemberRepository,
        private readonly utilService: UtilService,
        private readonly logger: WinstonLogger
    ) {
        this.logger.setContext('SigninController');
    }

    @Get('')
    index(
        @Session() session: Record<string, any>,
        @Res() res: Response,
    ): void {
        if (session && session.adminId && session.otpVerified) {
            if(session.passwordExpired) { 
                return res.redirect(`/manage_admin_member/password`);
            } else {
                return res.redirect(`/id_approval`);
            }
        }
        return res.render('signin');
    }

    @Post('')
    async signIn(
        @Session() session: Record<string, any>,
        @Body() body: SignInRequest,
        @Res() res: Response,
    ): Promise<void> {
        this.logger.log(`signIn request, email: ${hideEmailInfo(body.email)}`);
        if (!session.loginTryCount) {
            session.loginTryCount = 0;
        }        

        const adminMember = await this.adminMemberRepository.findOneByEmail(body.email);
        if (adminMember?.status == AdminStatus.BLOCKED) {
            return res.end('{"success": false, "message": "비활성화된 계정입니다. 개발팀에 문의해주세요."}');
        }

        if (!adminMember) {
            this.logger.error(`cannot find admin member email: ${hideEmailInfo(body.email)}`);
            return res.end('{"success": false, "message": ""}');
        }
        const encryptedPassword = await pbkdf2Async(body.password, config.server.passwordSecret);
        if (adminMember.password !== encryptedPassword) {
            this.logger.error(`password is invalid email: ${hideEmailInfo(body.email)}`);
            
            session.adminEmail = adminMember.email;
            session.loginTryCount += 1;

            if (session.loginTryCount >= 5) {
                await this.adminMemberRepository.blockAdmin(session.adminEmail);
                return res.end('{"success": false, "message": "로그인 5회 연속 실패로 계정이 비활성화 되었습니다. 개발팀에게 문의해주세요."}');
            }
            return res.end('{"success": false, "message": ""}');
        }

        session.adminId = adminMember.uuid;
        session.adminName = adminMember.name;
        session.adminEmail = adminMember.email;
        session.activityDt = new Date();

        if (adminMember.otpSecret === null) {
            const otpSecret: GeneratedSecret = await this.utilService.generateOTPSecret(adminMember.email)
                .then((result) => {
                    return result;
                });
            
            adminMember.otpSecret = otpSecret.base32;
            await this.adminMemberRepository.updateAdminOTPSecret(adminMember);
            session.otpSecret = adminMember.otpSecret;

            const response = {
                success: true,
                otpImgUrl: await this.utilService.generateOTPQR(otpSecret.ascii, adminMember.email)
                    .then((result) => {
                        return result
                    })
            }

            return res.end(JSON.stringify(response));
        }

        session.otpSecret = adminMember.otpSecret;
        session.loginTryCount = 0;
        return res.end('{"success": true, "message": ""}');
    }

    @Post('/otp/:userToken')
    async signInOtp(
        @Session() session: Record<string, any>,
        @Param('userToken') userToken: string,
        @Res() res: Response,
    ): Promise<void> {

        const otpVerified = await this.utilService.checkOtp(userToken, session.otpSecret);
        if (otpVerified === true) {
            session.otpVerified = otpVerified;
            const adminMember = await this.adminMemberRepository.findOneByEmail(session.adminEmail);

            if (!adminMember) {
                this.logger.error(`cannot find admin member email: ${hideEmailInfo(session.adminEmail)}`);
                return res.end('{"success": false}');
            }

            if (adminMember.passwordUpdatedAt == null) {
                session.passwordExpired = true;
            } else {
                const changedPeriod = Math.floor((now()-adminMember.passwordUpdatedAt)/(24 * 60 * 60 * 1000));
                if (changedPeriod >= 180) {
                    this.logger.error(`More than 180 days have passed since the password was changed. email: ${hideEmailInfo(session.adminEmail)}`);
                    session.passwordExpired = true;
                } else {
                    session.passwordExpired = false;
                }
            }

            return res.end('{"success": true}');
        }

        return res.end('{"success": false}');
    }
}