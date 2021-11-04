import {config} from "@src/config";
import {Injectable} from "@nestjs/common";
import {InjectConnection, InjectRepository} from "@nestjs/typeorm";
import {Connection} from "typeorm";
import {WinstonLogger} from "@src/logger/WinstonLogger";
import { ObAuthLogRepository } from "@src/repository/master/openbanking/ObAuthLogRepository";
import { MemberService } from "@src/service/MemberService";
import axios from 'axios';
import { URLSearchParams } from "url";
import { ObAuthLogDto } from "@src/model/dto/openbanking/ObAuthLogDto";
import { ObTokenDto } from "@src/model/dto/openbanking/ObTokenDto";
import { ObTokenRepository } from "@src/repository/master/openbanking/ObTokenRepository";
import { ObToken } from "@src/model/entity/master/openbanking/ObToken";

@Injectable()
export class OpenBankingService {

    constructor(
        @InjectConnection(config.db.master.name) private readonly masterConnection: Connection,
        @InjectRepository(ObAuthLogRepository, config.db.master.name) private readonly obAuthLogRepository: ObAuthLogRepository,
        @InjectRepository(ObTokenRepository, config.db.master.name) private readonly obTokenRepository: ObTokenRepository,

        private readonly memberService: MemberService,
        private readonly logger: WinstonLogger,
    ) {
        logger.setContext('OpenBankingService');
    }

    async getAuthUrl(email: string): Promise<string> {
        const member = await this.memberService.findOneByEmail(email);
        if (!member) {
            return "";
        }
        
        const userSeq = member.seq;
        const authUrl = new URL(config.openbanking.url.authUri);
        authUrl.searchParams.append('client_id', config.openbanking.common.key);
        authUrl.searchParams.append('response_type', 'code');
        authUrl.searchParams.append('scope', 'login inquiry transfer');
        authUrl.searchParams.append('client_info', userSeq + "");
        authUrl.searchParams.append('auth_type', '0');
        authUrl.searchParams.append('state', member.accessToken.replace(/\-/gi, ""));
        authUrl.searchParams.append('lang', 'kor');
        authUrl.searchParams.append('redirect_uri', config.openbanking.url.redirectUri);
        return authUrl.href;
    }

    async insertObAuthLog(dto: ObAuthLogDto): Promise<void> {
        await this.obAuthLogRepository.insertObAuthLog(dto);
    }

    async verifyObRegState(userSeq: string, state: string): Promise<boolean> {
        const member = await this.memberService.findOneByUserSeq(userSeq);
        let accessToken;

        if (member && member.accessToken) {
            accessToken = member.accessToken.replace(/\-/gi, "");
        }
        if (!state || state.toLocaleLowerCase() != accessToken) {
            return false;
        }

        return true;
    }

    async issueObToken(userSeq: string, authorizationCode: string): Promise<boolean> {
        const params = new URLSearchParams();
        params.append('code', authorizationCode);
        params.append('client_id', config.openbanking.common.key);
        params.append('client_secret', config.openbanking.common.secret);
        params.append('redirect_uri', config.openbanking.url.redirectUri);
        params.append('grant_type', 'authorization_code');
        this.logger.log(`Issue ObToken param, param: ${params.toString()}`);

        const response = await axios.post(
            config.openbanking.url.tokenUri,
            params
        );
        const resData = response.data;
        const token: ObTokenDto = {
            userSeq: userSeq,
            accessToken: resData.access_token,
            refreshToken: resData.refresh_token, 
            expiresIn: resData.expires_in, 
            scope: resData.scope, 
            userSeqNo: resData.user_seq_no, 
            rspCode: resData.rsp_code, 
            rspMessage: resData.rsp_message
        }
        await this.upsertObToken(token);
        
        return token.accessToken ? true : false;
    }

    async insertObToken(token: ObTokenDto): Promise<void> {
        await this.obTokenRepository.insertObToken(token);
    }

    async getObToken(userSeq: string): Promise<ObToken | undefined> {
        return await this.obTokenRepository.getObToken(userSeq);
    }

    async updateObToken(token: ObTokenDto): Promise<void> {
        await this.obTokenRepository.updateObToken(token);
    }

    async upsertObToken(dto: ObTokenDto): Promise<void> {
        await this.getObToken(dto.userSeq + "") 
            ? await this.updateObToken(dto) 
            : await this.insertObToken(dto);
    }

}