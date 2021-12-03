import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {objectToStringWithDeleteKeys} from '@src/util/conversion';
import {UNASSIGNED} from "@src/constants";
import {timeDefaultTransformer} from "@src/database/util";
import {AdminStatus} from '@src/model/type/AdminType';


@Entity("t_admin_member")
export class AdminMember {

    @PrimaryGeneratedColumn({name: 'seq', type: "bigint", unsigned: true})
    public seq!: string;

    @Column({name: 'uuid', unique: true, type: 'varchar', length: 64})
    public uuid!: string;

    @Column({name: 'name', type: 'varchar', default: UNASSIGNED})
    public name!: string;

    @Column({name: 'email', type: 'varchar', unique: true})
    public email!: string;

    @Column({name: 'password', type: 'varchar', nullable: false})
    public password!: string;

    @Column({name: 'phone', type: 'varchar', nullable: true})
    public phone!: string;

    @Column({name: 'status', type: 'varchar', nullable: true})
    public status!: AdminStatus;

    @Column({name: 'otp_secret', type: 'varchar', nullable: true, length: 64})
    public otpSecret!: string;

    @Column({name: 'otp_try_count', type: 'tinyint', default: 0})
    public otpTryCount!: number;

    @Column({name: 'otp_max_count', type: 'tinyint', default: 0})
    public otpMaxCount!: number;

    @Column({
        name: 'otp_authenticated_at',
        type: 'timestamp',
        default: () => `CURRENT_TIMESTAMP`,
        transformer: timeDefaultTransformer,
    })
    public otpAuthenticatedAt!: number;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        update: false,
        default: () => `CURRENT_TIMESTAMP`,
        transformer: timeDefaultTransformer,
    })
    public createdAt!: number;

    @Column({
        name: 'updated_at',
        type: 'timestamp',
        default: () => `CURRENT_TIMESTAMP`,
        transformer: timeDefaultTransformer,
    })
    public updatedAt!: number;


    @Column({
        name: 'password_updated_at',
        type: 'timestamp',
        transformer: timeDefaultTransformer,
    })
    public passwordUpdatedAt!: number;

    public toString(): string {
        return objectToStringWithDeleteKeys([])(this);
    }
}
