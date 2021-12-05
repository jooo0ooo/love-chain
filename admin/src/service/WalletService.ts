import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {config} from "@src/config";
import {EntityManager} from "typeorm";
import {WinstonLogger} from "@src/logger/WinstonLogger";
import {WalletHistory} from "@src/model/entity/client/WalletHistory";
import {WalletAsset} from "@src/model/type/WalletType";
import {WalletInfoRepository} from "@src/repository/client/WalletInfoRepository";
import { WalletInfo } from "@src/model/entity/client/WalletInfo";
import { WalletHistoryRepository } from "@src/repository/client/WalletHistoryRepository";

@Injectable()
export class WalletService {

    constructor(
        @InjectRepository(WalletInfoRepository, config.db.client.name) private readonly walletInfoRepository: WalletInfoRepository,
        @InjectRepository(WalletHistoryRepository, config.db.client.name) private readonly walletHistoryRepository: WalletHistoryRepository,

        private readonly logger: WinstonLogger,
    ) {
        logger.setContext('WalletService');
    }

}
