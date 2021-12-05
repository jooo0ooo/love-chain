import {EntityManager, EntityRepository, Repository} from "typeorm";
import {WalletInfo} from "@src/model/entity/client/WalletInfo";

const tableName = 't_wallet_info';

@EntityRepository(WalletInfo)
export class WalletInfoRepository extends Repository<WalletInfo> {

    async getWalletInfoWithAsset(memberId: string, asset: string, manager?: EntityManager): Promise<WalletInfo | undefined> {
        const queryBuilder = manager?.createQueryBuilder(WalletInfo, tableName) || this.createQueryBuilder(tableName);
        return queryBuilder
            .select()
            .where(`${tableName}.member_id = :memberId AND ${tableName}.asset = :asset`, { memberId, asset })
            .getOne();
    }
    
}
