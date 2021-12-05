import { LvPin } from "@src/model/entity/client/LvPin";
import {EntityManager, EntityRepository, Repository} from "typeorm";

const tableName = 't_lv_pin';

@EntityRepository(LvPin)
export class LvPinRepository extends Repository<LvPin> {

    async saveLvPin(lvPin: LvPin, manager?: EntityManager): Promise<LvPin> {
        return manager ?
            await manager.save(lvPin) :
            await this.save(lvPin);
    }

    async getLvPinByMemberId(memberId: string, manager?: EntityManager): Promise<LvPin | undefined> {
        const queryBuilder = manager?.createQueryBuilder(LvPin, tableName) || this.createQueryBuilder(tableName);
        return queryBuilder
            .select()
            .where(`${tableName}.memberId = :memberId`, {memberId})
            .getOne();
    }

    async updateLvPin(memberId: string, pin: string, manager?: EntityManager): Promise<void> {
        const queryBuilder = manager?.createQueryBuilder(LvPin, tableName) || this.createQueryBuilder(tableName);
        await queryBuilder
            .update()
            .set({pin: pin})
            .where("member_id = :memberId", { memberId: memberId })
            .execute();
    }
}
