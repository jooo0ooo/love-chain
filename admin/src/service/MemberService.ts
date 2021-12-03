import {config} from "@src/config";
import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectConnection, InjectRepository} from "@nestjs/typeorm";
import {Connection} from "typeorm";
import {WinstonLogger} from "@src/logger/WinstonLogger";
import { Member } from "@src/model/entity/client/Member";
import { UtilService } from "@src/service/UtilService";
import { MemberRepository } from "@src/repository/master/MemberRepository";
import { UpdateMemberDto } from "@src/model/dto/update/UpdateMemberDto";

@Injectable()
export class MemberService {

    constructor(
        @InjectRepository(MemberRepository, config.db.client.name) private readonly memberRepository: MemberRepository,
        @InjectConnection(config.db.client.name) private readonly clientConnection: Connection,

        private readonly utilService: UtilService,
        private readonly logger: WinstonLogger,
    ) {
        logger.setContext('MemberService');
    }

    async findOneByUuid(uuid: string): Promise<Member | undefined> {
        return await this.memberRepository.findOneByUuid(uuid);
    }

    async findOneByEmail(email: string): Promise<Member | undefined> {
        return await this.memberRepository.findOneByEmail(email);
    }

    async findOneByNickname(nickname: string): Promise<Member | undefined> {
        return await this.memberRepository.findOneByNickname(nickname);
    }

    async findOneByUserSeq(userSeq: string): Promise<Member | undefined> {
        return await this.memberRepository.findOneByUserSeq(userSeq);
    }

    async isExistEmail(email: string): Promise<boolean> {
        const member = await this.findOneByEmail(email);
        return member ? true : false;
    }

    async isExistNickname(nickname: string): Promise<boolean> {
        const member = await this.findOneByNickname(nickname);
        return member ? true : false;
    }

    async updateMember(dto: UpdateMemberDto): Promise<void> {
        await this.clientConnection.transaction(async (manager) => {
            await this.memberRepository.updateMember(dto, manager);
        });
    }

}