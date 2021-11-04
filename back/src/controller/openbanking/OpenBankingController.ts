import {Response} from "express";
import { Controller, Get, Query, Res, Session } from '@nestjs/common';
import { StateNotMatchException } from '@src/exception/openbanking/StateNotMatchException';
import { WrongResponseException } from '@src/exception/openbanking/WrongResponseException';
import { WinstonLogger } from '@src/logger/WinstonLogger';
import { OpenBankingService } from '@src/service/OpenBankingService';

@Controller('openbanking')
export class OpenBankingController {
    constructor (
        private readonly openBankingService: OpenBankingService,
        private readonly logger: WinstonLogger
    ) {
        this.logger.setContext('OpenBankingController');
    }

    @Get('/register')
    async register(
        @Session() session: Record<string, any>
    ): Promise<string> {
        return await this.openBankingService.getAuthUrl(session.memberEmail);
    }

    @Get('/callback')
    async callback(
        @Query('client_info') clientInfo: string | undefined,
        @Query('code') code: string | undefined,
        @Query('state') state: string | undefined,
        @Query('scope') scope: string | undefined,
        @Query('error') error: string | undefined,
        @Query('error_description') errorDescription: string | undefined,
        @Res() res: Response
    ): Promise<any> {
        
        const response = {clientInfo, code, state, scope, error, errorDescription};
        this.logger.log(`callback response query param, param: ${JSON.stringify(response)}`);
        
        await this.openBankingService.insertObAuthLog(response);
        
        if (!response || !response.code || !response.clientInfo) {
            this.logger.error(`Wrong Response, response: ${response}`);
            throw new WrongResponseException();
        }

        const userSeq = response.clientInfo.replace(/[^(0-9)]/gi, "");

        if (!response.state || !(await this.openBankingService.verifyObRegState(userSeq, response.state))) {
            this.logger.error(`state doesn't match`);
            throw new StateNotMatchException();
        }

        await this.openBankingService.issueObToken(userSeq, response.code);
        
        return res.redirect(`http://localhost:3634`);
    }
}