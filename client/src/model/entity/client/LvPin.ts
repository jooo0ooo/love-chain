import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {WinstonLogger} from '@src/logger/WinstonLogger';
import {timeDefaultTransformer} from "@src/database/util";

const logger = new WinstonLogger().setContext('LvPin');

@Entity("t_lv_pin")
export class LvPin {

    @PrimaryGeneratedColumn({name: 'seq', type: "bigint", unsigned: true})
    public seq!: string;

    @Column({name: 'member_id', type: 'varchar', length: 64})
    public memberId!: string;

    @Column({name: 'pin', type: 'varchar'})
    public pin!: string;

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
