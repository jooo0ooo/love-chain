import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {WinstonLogger} from '@src/logger/WinstonLogger';
import {timeDefaultTransformer} from "@src/database/util";
import { MemberStatus } from '@src/model/type/MemberType';

const logger = new WinstonLogger().setContext('Member');

@Entity("t_member")
export class Member {

    @PrimaryGeneratedColumn({name: 'seq', type: "bigint", unsigned: true})
    public seq!: string;

    @Column({name: 'uuid', unique: true, type: 'varchar', length: 64})
    public uuid!: string;

    @Column({name: 'name', type: 'varchar'})
    public name!: string;

    @Column({name: 'nickname', type: 'varchar'})
    public nickname!: string;

    @Column({name: 'email', type: 'varchar'})
    public email!: string;

    @Column({name: 'password', type: 'varchar'})
    public password!: string;

    @Column({name: 'gender', type: 'varchar'})
    public gender!: string;

    @Column({name: 'birth_date', type: 'varchar'})
    public birthDate!: string;

    @Column({name: 'nationality', type: 'varchar'})
    public nationality!: string;

    @Column({name: 'phone', type: 'varchar'})
    public phone!: string;

    @Column({name: 'status', type: 'varchar', default: MemberStatus.CREATED})
    public status!: MemberStatus;

    @Column({name: 'access_token', unique: true, type: 'varchar', length: 64})
    public accessToken!: string;

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

}
