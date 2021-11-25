import {config} from "@src/config";
import {Injectable} from "@nestjs/common";
import {InjectConnection, InjectRepository} from "@nestjs/typeorm";
import {Connection} from "typeorm";
import {WinstonLogger} from "@src/logger/WinstonLogger";
import { MemberRepository } from "@src/repository/client/MemberRepository";
import { SignupDto } from "@src/model/dto/SignupDto";
import { Member } from "@src/model/entity/client/Member";

@Injectable()
export class MemberService {

    constructor(
        @InjectRepository(MemberRepository, config.db.client.name) private readonly memberRepository: MemberRepository,

        @InjectConnection(config.db.client.name) private readonly clientConnection: Connection,

        private readonly logger: WinstonLogger,
    ) {
        logger.setContext('MemberService');
    }

    async insertMember(dto: SignupDto): Promise<void> {            
        await this.clientConnection.transaction(async (manager) => {
            await this.memberRepository.insertMember(dto, manager);
        });
    }

    async findOneByEmail(email: string): Promise<Member | undefined> {
        return await this.memberRepository.findOneByEmail(email);
    }

    async findOneByUsername(username: string): Promise<Member | undefined> {
        return await this.memberRepository.findOneByUsername(username);
    }

    async findOneByUserSeq(userSeq: string): Promise<Member | undefined> {
        return await this.memberRepository.findOneByUserSeq(userSeq);
    }

    async isExistEmail(email: string): Promise<boolean> {
        const member = await this.findOneByEmail(email);
        return member ? true : false;
    }

    async isExistUsername(username: string): Promise<boolean> {
        const member = await this.findOneByUsername(username);
        return member ? true : false;
    }
}