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
        return res.render('home', {
        });
    }

    @Get('/manage_members')
    manageMember(
        @Session() session: Record<string, any>,
        @Res() res: Response,
    ): void {
        
        return res.render('member/manage_members', {
        });
    }

    @Get('ping')
    ping(): string {
        return 'pong';
    }

}