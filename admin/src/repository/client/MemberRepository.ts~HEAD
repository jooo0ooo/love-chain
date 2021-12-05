import { UpdateMemberDto } from "@src/model/dto/update/UpdateMemberDto";
import { Member } from "@src/model/entity/client/Member";
import { deleteBlankOrNull } from "@src/util/conversion";
import {EntityManager, EntityRepository, Repository} from "typeorm";

const tableName = 't_member';

@EntityRepository(Member)
export class MemberRepository extends Repository<Member> {

    async findOneByUuid(uuid: string, manager?: EntityManager): Promise<Member | undefined> {
        const queryBuilder = manager?.createQueryBuilder(Member, tableName) || this.createQueryBuilder(tableName);
        return queryBuilder
            .select()
            .where(`${tableName}.uuid = :uuid`, {uuid})
            .getOne();
    }

    async findOneByEmail(email: string, manager?: EntityManager): Promise<Member | undefined> {
        const queryBuilder = manager?.createQueryBuilder(Member, tableName) || this.createQueryBuilder(tableName);
        return queryBuilder
            .select()
            .where(`${tableName}.email = :email`, {email})
            .getOne();
    }

    async findOneByNickname(nickname: string, manager?: EntityManager): Promise<Member | undefined> {
        const queryBuilder = manager?.createQueryBuilder(Member, tableName) || this.createQueryBuilder(tableName);
        return queryBuilder
            .select()
            .where(`${tableName}.nickname = :nickname`, {nickname})
            .getOne();
    }

    async findOneByUserSeq(userSeq: string, manager?: EntityManager): Promise<Member | undefined> {
        const queryBuilder = manager?.createQueryBuilder(Member, tableName) || this.createQueryBuilder(tableName);
        return queryBuilder
            .select()
            .where(`${tableName}.seq = :userSeq`, {userSeq})
            .getOne();
    }

    async updateMember(dto: UpdateMemberDto, manager?: EntityManager): Promise<void> {
        const queryBuilder = manager?.createQueryBuilder(Member, tableName) || this.createQueryBuilder(tableName);
        await queryBuilder
            .update()
            .set(deleteBlankOrNull(dto, ['']))
            .where(`${tableName}.uuid = :uuid`, { uuid: dto.uuid })
            .execute();
    }
}
