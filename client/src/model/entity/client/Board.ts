import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {WinstonLogger} from '@src/logger/WinstonLogger';
import {timeDefaultTransformer} from "@src/database/util";
import { BoardStatus, PaymentType } from '@src/model/type/BoardType';

const logger = new WinstonLogger().setContext('Board');

@Entity("t_board")
export class Board {

    @PrimaryGeneratedColumn({name: 'seq', type: "bigint", unsigned: true})
    public seq!: string;

    @Column({name: 'uuid', unique: true, type: 'varchar', length: 64})
    public uuid!: string;

    @Column({name: 'member_id', type: 'varchar', length: 64})
    public memberId!: string;

    @Column({name: 'text_type', type: 'varchar'})
    public textType!: string;

    @Column({name: 'payment_type', type: 'varchar'})
    public paymentType!: PaymentType;

    @Column({name: 'is_private', type: 'varchar'})
    public isPrivate!: string;

    @Column({name: 'board_text', type: 'varchar'})
    public boardText!: string;

    @Column({name: 'status', type: 'varchar', default: BoardStatus.SUBMITTED})
    public status!: BoardStatus;

    @Column({name: 'tx_id', type: 'varchar'})
    public txId!: string;

    @Column({name: 'confirm_count', type: 'int'})
    public confirmCount!: number;

    @Column({name: 'nickname', type: 'varchar'})
    public nickname!: string;

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