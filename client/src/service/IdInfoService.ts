import {config} from "@src/config";
import {Injectable} from "@nestjs/common";
import {InjectConnection, InjectRepository} from "@nestjs/typeorm";
import {Connection} from "typeorm";
import {WinstonLogger} from "@src/logger/WinstonLogger";
import { IdInfoRepository } from "@src/repository/client/IdInfoRepository";

@Injectable()
export class IdInfoService {

    constructor(
        @InjectRepository(IdInfoRepository, config.db.client.name) private readonly idInfoRepository: IdInfoRepository,

        @InjectConnection(config.db.client.name) private readonly clientConnection: Connection,

        private readonly logger: WinstonLogger,
    ) {
        logger.setContext('IdInfoService');
    }

}