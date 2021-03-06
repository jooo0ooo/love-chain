import { SignupDto } from "@src/model/dto/SignupDto";
import { Member } from "@src/model/entity/client/Member";
import {EntityManager, EntityRepository, Repository} from "typeorm";

const tableName = 't_member';

@EntityRepository(Member)
export class MemberRepository extends Repository<Member> {

    async insertMember(signupDto: SignupDto, manager?: EntityManager): Promise<void> {
        const queryBuilder = manager?.createQueryBuilder(Member, tableName) || this.createQueryBuilder(tableName);
        await queryBuilder
            .insert()
            .values(signupDto)
            .updateEntity(false)
            .execute();
    }

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
}
