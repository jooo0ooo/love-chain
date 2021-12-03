import {EntityManager, EntityRepository, Repository} from "typeorm";
import {AdminMember} from "@src/model/entity/admin/AdminMember";
import { now } from "lodash";
import { AdminStatus } from "@src/model/type/AdminType";

const tableName = 't_admin_member';

@EntityRepository(AdminMember)
export class AdminMemberRepository extends Repository<AdminMember> {

    // =========== select

    async findOneByEmail(email: string, manager?: EntityManager): Promise<AdminMember | undefined> {
        const queryBuilder = manager?.createQueryBuilder(AdminMember, tableName) || this.createQueryBuilder(tableName);
        return queryBuilder
            .select()
            .where('email = :email', {email})
            .getOne();
    }

    async updateAdminOTPSecret(admin: AdminMember, manager?: EntityManager): Promise<void> {
        const queryBuilder = manager?.createQueryBuilder(AdminMember, tableName) || this.createQueryBuilder(tableName);
        await queryBuilder
            .update(AdminMember)
            .set({otpSecret: admin.otpSecret})
            .where("email = :email", { email: admin.email })
            .execute();
    }

    async changePassword(adminemail: string, password: string, manager?: EntityManager): Promise<void> {
        const queryBuilder = manager?.createQueryBuilder(AdminMember, tableName) || this.createQueryBuilder(tableName);
        await queryBuilder
            .update()
            .set({password : password, passwordUpdatedAt : now()})
            .where("email= :email", { email: adminemail})
            .execute();
    }

    async blockAdmin(email: string, manager?: EntityManager): Promise<void> {
        const queryBuilder = manager?.createQueryBuilder(AdminMember, tableName) || this.createQueryBuilder(tableName);
        await queryBuilder
            .update()
            .set({status: AdminStatus.BLOCKED})
            .where({email: email})
            .execute();
    }

    
}
