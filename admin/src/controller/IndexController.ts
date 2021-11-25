import {Response} from "express";
import { Controller, Get, Res, Session } from '@nestjs/common';
import { WinstonLogger } from '@src/logger/WinstonLogger';

@Controller()
export class IndexController {
    constructor (
        private readonly logger: WinstonLogger
    ) {
        this.logger.setContext('IndexController');
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
        return res.render('home', {
        });
    }

    @Get('/signin')
    signin(
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

    @Get('/id_approval')
    idApproval(
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
        return res.render('id_approval', {
        });
    }

    @Get('/manage_members')
    manageMember(
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
        return res.render('member/manage_members', {
        });
    }




    @Get('ping')
    ping(): string {
        return 'pong';
    }
}