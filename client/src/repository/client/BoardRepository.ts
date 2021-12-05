import { Board } from "@src/model/entity/client/Board";
import { LvPin } from "@src/model/entity/client/LvPin";
import {EntityManager, EntityRepository, Repository} from "typeorm";

const tableName = 't_board';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {

    async saveLvBoard(board: Board, manager?: EntityManager): Promise<Board> {
        return manager ?
            await manager.save(board) :
            await this.save(board);
    }

    async getBoardsByMemberId(memberId: string, manager?: EntityManager): Promise<Board[]> {
        const queryBuilder = manager?.createQueryBuilder(Board, tableName) || this.createQueryBuilder(tableName);
        return queryBuilder
            .select()
            .where(`${tableName}.memberId = :memberId`, {memberId})
            .getMany();
    }

    async getPublicBoards(manager?: EntityManager): Promise<Board[]> {
        const queryBuilder = manager?.createQueryBuilder(Board, tableName) || this.createQueryBuilder(tableName);
        return queryBuilder
            .select()
            .where(`${tableName}.idPrivate = 'public' AND ${tableName}.status = 'APPROVED'`)
            .getMany();
    }
}
