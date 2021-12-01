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
    home(
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
    write(
        @Session() session: Record<string, any>,
        @Res() res: Response,
    ): void {
        
        if (!(session && session.memberSeq && session.memberUuid)) {
            return res.redirect(`/signin`);
        }
        
        return res.render('write', {});
    }

    @Get('/profile')
    profile(
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
        return res.render('profile', {
        });
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

    @Get('/pin')
    pin(
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
        return res.render('pin', {
        });
    }

    @Get('/auto_debit')
    autodebit(
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
        return res.render('auto_debit', {
        });
    }

    @Get('ping')
    ping(): string {
        return 'pong';
    }
}