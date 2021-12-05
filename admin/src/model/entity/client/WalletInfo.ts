import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {WinstonLogger} from "@src/logger/WinstonLogger";
import {objectToStringWithDeleteKeys} from "@src/util/conversion";
import {timeDefaultTransformer} from "@src/database/util";
import {WalletAsset} from "@src/model/type/WalletType";

const logger = new WinstonLogger().setContext('WalletInfo');

@Entity('t_wallet_info')
export class WalletInfo {

    @PrimaryGeneratedColumn({name: 'seq', type: "bigint", unsigned: true})
    public seq!: string;

    @Column({name: 'uuid', type: 'varchar', nullable: false})
    public uuid!: string;

    @Column({name: 'member_id', type: 'varchar', nullable: false})
    public memberId!: string;

    @Column({name: 'asset', type: 'varchar', nullable: false})
    public asset!: WalletAsset;

    @Column({name: 'address', type: 'varchar', nullable: false})
    public address!: string;
    
    @Column({name: 'private_key', type: 'varchar', nullable: false})
    public privateKey!: string;

    @Column({name: 'balance', type: 'decimal', precision: 25, scale: 8, nullable: false})
    public balance!: string;

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
