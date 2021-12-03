import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {WinstonLogger} from '@src/logger/WinstonLogger';
import {timeDefaultTransformer} from "@src/database/util";
import { IdInfoStatus } from '@src/model/type/IdInfoType';
import { Member } from '@src/model/entity/client/Member';

const logger = new WinstonLogger().setContext('IdInfo');

@Entity("t_id_info")
export class IdInfo {

    @PrimaryGeneratedColumn({name: 'seq', type: "bigint", unsigned: true})
    public seq!: string;

    @Column({name: 'uuid', unique: true, type: 'varchar', length: 64})
    public uuid!: string;

    @Column({name: 'member_id', type: 'varchar', length: 64})
    public memberId!: string;

    @Column({name: 'id_number', type: 'varchar'})
    public idNumber!: string;

    @Column({name: 'picture', type: 'varchar'})
    public picture!: string;

    @Column({name: 'status', type: 'varchar', default: IdInfoStatus.SUBMITTED})
    public status!: IdInfoStatus;

    @Column({name: 'admin_memo', type: 'varchar', nullable: true})
    public adminMemo!: string | null;

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

    public member!: Member;

}
