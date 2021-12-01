import { ObAuthLogDto } from "@src/model/dto/openbanking/ObAuthLogDto";
import { ObAuthLog } from "@src/model/entity/client/openbanking/ObAuthLog";
import {EntityManager, EntityRepository, Repository} from "typeorm";

const tableName = 't_ob_auth_log';

@EntityRepository(ObAuthLog)
export class ObAuthLogRepository extends Repository<ObAuthLog> {

    async insertObAuthLog(dto: ObAuthLogDto, manager?: EntityManager): Promise<void> {
        const queryBuilder = manager?.createQueryBuilder(ObAuthLog, tableName) || this.createQueryBuilder(tableName);
        await queryBuilder
            .insert()
            .values(dto)
            .updateEntity(false)
            .execute();
    }
}
