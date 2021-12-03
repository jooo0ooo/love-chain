import {config} from "@src/config";
import {Injectable} from "@nestjs/common";
import {InjectConnection, InjectRepository} from "@nestjs/typeorm";
import {Connection} from "typeorm";
import {WinstonLogger} from "@src/logger/WinstonLogger";
import { AdminMemberRepository } from "@src/repository/admin/AdminMemberRepository";
import { AdminMember } from "@src/model/entity/admin/AdminMember";


@Injectable()
export class AdminMemberService {

    constructor(
        @InjectRepository(AdminMemberRepository, config.db.admin.name) private readonly adminMemberRepository: AdminMemberRepository,
        @InjectConnection(config.db.admin.name) private readonly adminConnection: Connection,

        private readonly logger: WinstonLogger,
    ) {
        logger.setContext('AdminMemberService');
    }
    async findOneByEmail(adminEmail : string) : Promise<AdminMember | undefined> {
        return await this.adminMemberRepository.findOneByEmail(adminEmail);
    }

    async changePassword(adminEmail: string, passwordInEncrypted: string) : Promise<void>{
        await this.adminConnection.transaction(async (manager) => {
            await this.adminMemberRepository.changePassword(adminEmail, passwordInEncrypted, manager);
        })
    }
    

}