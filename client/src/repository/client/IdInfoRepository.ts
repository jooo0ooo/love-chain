import { IdInfoDto } from "@src/model/dto/IdInfoDto";
import { IdInfo } from "@src/model/entity/client/IdInfo";
import {EntityManager, EntityRepository, Repository} from "typeorm";

const tableName = 't_id_info';

@EntityRepository(IdInfo)
export class IdInfoRepository extends Repository<IdInfo> {

    async insertIdInfo(idInfoDto: IdInfoDto, manager?: EntityManager): Promise<void> {
        const queryBuilder = manager?.createQueryBuilder(IdInfo, tableName) || this.createQueryBuilder(tableName);
        await queryBuilder
            .insert()
            .values(idInfoDto)
            .updateEntity(false)
            .execute();
    }
}
