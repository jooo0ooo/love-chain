import { UpdateIdInfoDto } from "@src/model/dto/update/UpdateIdInfoDto";
import { IdInfo } from "@src/model/entity/client/IdInfo";
import { Member } from "@src/model/entity/client/Member";
import { deleteBlankOrNull } from "@src/util/conversion";
import {EntityManager, EntityRepository, Repository} from "typeorm";

const tableName = 't_id_info';

@EntityRepository(IdInfo)
export class IdInfoRepository extends Repository<IdInfo> {

    async getIdInfo(seq: string, manager?: EntityManager): Promise<IdInfo> {
        const queryBuilder = manager?.createQueryBuilder() || this.createQueryBuilder();
        return await queryBuilder
            .select()
            .where("seq = :seq", { seq: seq })
            .getOne();
    }

    async getUnApprovalIdListCount(manager?: EntityManager): Promise<number> {
        const queryBuilder = manager?.createQueryBuilder(IdInfo, tableName) || this.createQueryBuilder(tableName);
        const memberAlias = 'member';
        return queryBuilder
            .leftJoinAndMapOne(`${tableName}.${memberAlias}`, Member, memberAlias, `${tableName}.member_id = ${memberAlias}.uuid`)
            .select([tableName + '.seq'])
            .where(`${tableName}.status = 'SUBMITTED'`)
            .getCount()
    }

    async getUnApprovalIdList(limit: number, offset: number, manager?: EntityManager): Promise<IdInfo[]> {
        const queryBuilder = manager?.createQueryBuilder(IdInfo, tableName) || this.createQueryBuilder(tableName);
        const memberAlias = 'member';
        return queryBuilder
            .leftJoinAndMapOne(`${tableName}.${memberAlias}`, Member, memberAlias, `${tableName}.member_id = ${memberAlias}.uuid`)
            .select()
            .where(`${tableName}.status = 'SUBMITTED'`)
            .orderBy(`${tableName}.seq`, "ASC")
            .limit(limit)
            .offset(offset)
            .getMany()
    }

    async getCompletedApprovalIdListCount(manager?: EntityManager): Promise<number> {
        const queryBuilder = manager?.createQueryBuilder(IdInfo, tableName) || this.createQueryBuilder(tableName);
        const memberAlias = 'member';
        return queryBuilder
            .leftJoinAndMapOne(`${tableName}.${memberAlias}`, Member, memberAlias, `${tableName}.member_id = ${memberAlias}.uuid`)
            .select([tableName + '.seq'])
            .where(`${tableName}.status != 'SUBMITTED'`)
            .getCount()
    }

    async getCompletedApprovalIdList(limit: number, offset: number, manager?: EntityManager): Promise<IdInfo[]> {
        const queryBuilder = manager?.createQueryBuilder(IdInfo, tableName) || this.createQueryBuilder(tableName);
        const memberAlias = 'member';
        return queryBuilder
            .leftJoinAndMapOne(`${tableName}.${memberAlias}`, Member, memberAlias, `${tableName}.member_id = ${memberAlias}.uuid`)
            .select()
            .where(`${tableName}.status != 'SUBMITTED'`)
            .orderBy(`${tableName}.seq`, "DESC")
            .limit(limit)
            .offset(offset)
            .getMany()
    }

    async updateIdInfo(dto: UpdateIdInfoDto, manager?: EntityManager): Promise<void> {
        const queryBuilder = manager?.createQueryBuilder() || this.createQueryBuilder();
        await queryBuilder
            .update(IdInfo)
            .set(deleteBlankOrNull(dto, ['seq']))
            .where("seq = :seq", { seq: dto.seq })
            .execute();
    }
}
