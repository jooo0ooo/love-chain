import {config} from "@src/config";
import {Injectable} from "@nestjs/common";
import {InjectConnection, InjectRepository} from "@nestjs/typeorm";
import {Connection} from "typeorm";
import {WinstonLogger} from "@src/logger/WinstonLogger";
import { IdInfoRepository } from "@src/repository/client/IdInfoRepository";
import { IdInfo } from "@src/model/entity/client/IdInfo";
import { UtilService } from "@src/service/UtilService";
import { IdInfoStatus } from "@src/model/type/IdInfoType";
import { v4 as uuidV4 } from "uuid";

@Injectable()
export class IdInfoService {

    constructor(
        @InjectRepository(IdInfoRepository, config.db.client.name) private readonly idInfoRepository: IdInfoRepository,

        @InjectConnection(config.db.client.name) private readonly clientConnection: Connection,

        private readonly utilService: UtilService,
        private readonly logger: WinstonLogger,
    ) {
        logger.setContext('IdInfoService');
    }

    async findIdInfoByMemberId(memberId: string): Promise<IdInfo | undefined> {
        return await this.idInfoRepository.findIdInfoByMemberId(memberId);
    }

    async updateIdInfoAgain(memberId: string, idNumber: string, file: Express.Multer.File): Promise<void> {
        const picId = uuidV4().toString();
        const fileExt = file.originalname.substring(
            file.originalname.lastIndexOf('.'),
            file.originalname.length
        );

        const s3BaseUrl = config.aws.s3.baseUri;
        const filepath = `id_picture/${picId}${fileExt}`;
        await this.utilService.uploadImgToS3(file, filepath);

        await this.idInfoRepository.updateIdInfoAgain({
            status: IdInfoStatus.SUBMITTED,
            picture: s3BaseUrl + filepath,
            idNumber: idNumber,
            memberId: memberId
        });
    }

    

}