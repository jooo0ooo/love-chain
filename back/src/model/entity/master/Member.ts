import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {WinstonLogger} from '@src/logger/WinstonLogger';
import {UNASSIGNED} from "@src/constants";
import {timeDefaultTransformer} from "@src/database/util";

const logger = new WinstonLogger().setContext('Member');

@Entity("t_member")
export class Member {

    @PrimaryGeneratedColumn({name: 'seq', type: "bigint", unsigned: true})
    public seq!: string;

    @Column({name: 'uuid', unique: true, type: 'varchar', length: 64})
    public uuid!: string;

    @Column({name: 'username', type: 'varchar', default: UNASSIGNED})
    public username!: string;

    @Column({name: 'email', type: 'varchar', default: UNASSIGNED})
    public email!: string;

    @Column({name: 'password', type: 'varchar', default: UNASSIGNED})
    public password!: string;

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
