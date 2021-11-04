import { ObTokenDto } from "@src/model/dto/openbanking/ObTokenDto";
import { ObToken } from "@src/model/entity/master/openbanking/ObToken";
import { deleteBlankOrNull } from "@src/util/conversion";
import {EntityManager, EntityRepository, Repository} from "typeorm";

const tableName = 't_ob_token';

@EntityRepository(ObToken)
export class ObTokenRepository extends Repository<ObToken> {

    async insertObToken(dto: ObTokenDto, manager?: EntityManager): Promise<void> {
        const queryBuilder = manager?.createQueryBuilder(ObToken, tableName) || this.createQueryBuilder(tableName);
        await queryBuilder
            .insert()
            .values(dto)
            .updateEntity(false)
            .execute();
    }
    
    async updateObToken(dto: ObTokenDto, manager?: EntityManager): Promise<void> {
        const queryBuilder = manager?.createQueryBuilder(ObToken, tableName) || this.createQueryBuilder(tableName);
        await queryBuilder
            .update()
            .set(deleteBlankOrNull(dto, ['']))
            .where(`user_seq = :userSeq`, { userSeq: dto.userSeq })
            .execute();
    }

    async getObToken(userSeq: string, manager?: EntityManager): Promise<ObToken | undefined> {
        const queryBuilder = manager?.createQueryBuilder(ObToken, tableName) || this.createQueryBuilder(tableName);
        return queryBuilder
            .where(`user_seq = :userSeq`,{userSeq})
            .select()
            .getOne();
    }
}
