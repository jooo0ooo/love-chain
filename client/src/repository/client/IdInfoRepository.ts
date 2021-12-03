import { UpdateIdInfoDto } from "@src/controller/member/request/processRequest";
import { IdInfoDto } from "@src/model/dto/IdInfoDto";
import { IdInfo } from "@src/model/entity/client/IdInfo";
import { deleteBlankOrNull } from "@src/util/conversion";
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

    async findIdInfoByMemberId(memberId: string, manager?: EntityManager): Promise<IdInfo | undefined> {
        const queryBuilder = manager?.createQueryBuilder(IdInfo, tableName) || this.createQueryBuilder(tableName);
        return queryBuilder
            .select()
            .where(`${tableName}.memberId = :memberId`, {memberId})
            .getOne();
    }

    async updateIdInfoAgain(dto: UpdateIdInfoDto, manager?: EntityManager): Promise<void> {
        const queryBuilder = manager?.createQueryBuilder() || this.createQueryBuilder();
        await queryBuilder
            .update(IdInfo)
            .set(deleteBlankOrNull(dto, ['seq']))
            .where("member_id = :memberId", { memberId: dto.memberId })
            .execute();
    }
}
