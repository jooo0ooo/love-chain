import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {WinstonLogger} from "@src/logger/WinstonLogger";
import {objectToStringWithDeleteKeys} from "@src/util/conversion";
import {timeDefaultTransformer} from "@src/database/util";
import {WalletAsset, WalletEventStatus, WalletEventType, WalletHistoryType} from "@src/model/type/WalletType";

const logger = new WinstonLogger().setContext('WalletHistory');

@Entity('t_wallet_history')
export class WalletHistory {

    @PrimaryGeneratedColumn({name: 'seq', type: "bigint", unsigned: true})
    public seq!: string;

    @Column({name: 'asset', type: 'varchar', nullable: false})
    public asset!: WalletAsset;

    @Column({name: 'member_id', type: 'varchar', nullable: false})
    public memberId!: string;

    @Column({name: 'wallet_id', type: 'varchar', nullable: false})
    public walletId!: string;

    @Column({name: 'type', type: 'varchar', nullable: false})
    public type!: WalletHistoryType;

    @Column({name: 'event_id', type: 'varchar', nullable: false})
    public eventId!: string;

    @Column({name: 'event_type', type: 'varchar', nullable: false})
    public eventType!: WalletEventType;

    @Column({name: 'event_status', type: 'varchar', nullable: false})
    public eventStatus!: WalletEventStatus;

    @Column({name: 'amount', type: 'decimal', precision: 25, scale: 8, nullable: false})
    public amount!: string;

    @Column({name: 'fee_amount', type: 'decimal', precision: 25, scale: 8, nullable: false})
    public feeAmount!: string;

    @Column({name: 'result_amount', type: 'decimal', precision: 25, scale: 8, nullable: false})
    public resultAmount!: string;

    @Column({name: 'external_txid', type: 'varchar', nullable: true})
    public externalTxid!: string | null;

    @Column({name: 'external_address', type: 'varchar', nullable: true})
    public externalAddress!: string | null;

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

    public toString(): string {
        return objectToStringWithDeleteKeys(['logger'])(this);
    }

}
