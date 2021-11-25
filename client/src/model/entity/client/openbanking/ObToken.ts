import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {WinstonLogger} from '@src/logger/WinstonLogger';
import {timeDefaultTransformer} from "@src/database/util";

const logger = new WinstonLogger().setContext('ObToken');

@Entity("t_ob_token")
export class ObToken {

    @PrimaryGeneratedColumn({name: 'seq', type: "bigint", unsigned: true})
    public seq!: string;

    @Column({name: 'user_seq', type: 'varchar'})
    public userSeq!: string;

    @Column({name: 'access_token', type: 'varchar'})
    public accessToken!: string;

    @Column({name: 'expires_in', type: 'varchar'})
    public expiresIn!: string;

    @Column({name: 'refresh_token', type: 'varchar'})
    public refreshToken!: string;

    @Column({name: 'scope', type: 'varchar'})
    public scope!: string;

    @Column({name: 'user_seq_no', type: 'varchar'})
    public userSeqNo!: string;

    @Column({name: 'rsp_code', type: 'varchar'})
    public rspCode!: string;

    @Column({name: 'rsp_message', type: 'varchar'})
    public rspMessage!: string;

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
