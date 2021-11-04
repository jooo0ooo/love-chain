import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {WinstonLogger} from '@src/logger/WinstonLogger';
import {timeDefaultTransformer} from "@src/database/util";

const logger = new WinstonLogger().setContext('ObAuthLog');

@Entity("t_ob_auth_log")
export class ObAuthLog {

    @PrimaryGeneratedColumn({name: 'seq', type: "bigint", unsigned: true})
    public seq!: string;

    @Column({name: 'client_info', type: 'varchar'})
    public clientInfo!: string;

    @Column({name: 'code', type: 'varchar'})
    public code!: string;

    @Column({name: 'scope', type: 'varchar'})
    public scope!: string;

    @Column({name: 'error', type: 'varchar'})
    public error!: string;

    @Column({name: 'error_description', type: 'varchar'})
    public errorDescription!: string;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        update: false,
        default: () => `CURRENT_TIMESTAMP`,
        transformer: timeDefaultTransformer,
    })
    public createdAt!: number;
}
