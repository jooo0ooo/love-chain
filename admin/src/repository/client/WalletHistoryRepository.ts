import {EntityManager, EntityRepository, QueryBuilder, Repository} from "typeorm";
import {WalletHistory} from "@src/model/entity/client/WalletHistory";

const tableName = 't_wallet_history';

@EntityRepository(WalletHistory)
export class WalletHistoryRepository extends Repository<WalletHistory> {
    
    async saveWalletHistory(walletHistory: WalletHistory, manager?: EntityManager): Promise<WalletHistory> {
        return manager ?
            await manager.save(walletHistory) :
            await this.save(walletHistory);
    }

}
