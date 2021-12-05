import {config} from "@src/config";
import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectConnection, InjectRepository} from "@nestjs/typeorm";
import {Connection} from "typeorm";
import {WinstonLogger} from "@src/logger/WinstonLogger";
import { MemberRepository } from "@src/repository/client/MemberRepository";
import { SignupDto } from "@src/model/dto/SignupDto";
import { Member } from "@src/model/entity/client/Member";
import { IdInfoService } from "@src/service/IdInfoService";
import { v4 as uuidV4 } from "uuid";
import { toIdInfoDto } from "@src/model/dto/IdInfoDto";
import { UtilService } from "@src/service/UtilService";
import { IdInfoRepository } from "@src/repository/client/IdInfoRepository";
import { LvPinRepository } from "@src/repository/client/LvPinRepository";
import { LvPin } from "@src/model/entity/client/LvPin";
import { Builder } from "builder-pattern";
import { pbkdf2Async } from '@src/util/encryption';

@Injectable()
export class MemberService {

    constructor(
        @InjectRepository(MemberRepository, config.db.client.name) private readonly memberRepository: MemberRepository,
        @InjectRepository(IdInfoRepository, config.db.client.name) private readonly idInfoRepository: IdInfoRepository,
        @InjectRepository(LvPinRepository, config.db.client.name) private readonly lvPinRepository: LvPinRepository,
        @InjectConnection(config.db.client.name) private readonly clientConnection: Connection,

        private readonly utilService: UtilService,
        private readonly logger: WinstonLogger,
    ) {
        logger.setContext('MemberService');
    }

    async createMember(dto: SignupDto, file: Express.Multer.File): Promise<void> {            
        await this.clientConnection.transaction(async (manager) => {
            await this.memberRepository.insertMember(dto, manager);

            const picId = uuidV4().toString();
            const fileExt = file.originalname.substring(
                file.originalname.lastIndexOf('.'),
                file.originalname.length
            );

            const s3BaseUrl = config.aws.s3.baseUri;
            const filePath = `id_picture/${picId}${fileExt}`;
            await this.utilService.uploadImgToS3(file, filePath);
            await this.idInfoRepository.insertIdInfo(toIdInfoDto(dto.uuid, dto.idNumber, s3BaseUrl + filePath), manager)
        });
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

    async hasLvPin(memberId: string): Promise<boolean> {
        const pin = await this.lvPinRepository.getLvPinByMemberId(memberId);
        return pin ? true : false;
    }

    async saveLvPin(pinNum: string, memberId: string): Promise<void> {
        const encryptedPin = await pbkdf2Async(pinNum, config.server.passwordSecret);
        const pin = Builder(LvPin)
            .pin(encryptedPin)
            .memberId(memberId)
            .build();

        await this.lvPinRepository.saveLvPin(pin);
    }

    async updatePin(pinNum: string, memberId: string): Promise<void> {
        const encryptedPin = await pbkdf2Async(pinNum, config.server.passwordSecret);
        await this.lvPinRepository.updateLvPin(memberId, encryptedPin);
    }
}