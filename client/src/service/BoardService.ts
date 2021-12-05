import {config} from "@src/config";
import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectConnection, InjectRepository} from "@nestjs/typeorm";
import {Connection} from "typeorm";
import {WinstonLogger} from "@src/logger/WinstonLogger";
import { MemberRepository } from "@src/repository/client/MemberRepository";
import { SignupDto } from "@src/model/dto/SignupDto";
import { Member } from "@src/model/entity/client/Member";
import { IdInfoService } from "@src/service/IdInfoService";
import { v4 as uuidV4 } from "uuid";
import { toIdInfoDto } from "@src/model/dto/IdInfoDto";
import { UtilService } from "@src/service/UtilService";
import { IdInfoRepository } from "@src/repository/client/IdInfoRepository";
import { LvPinRepository } from "@src/repository/client/LvPinRepository";
import { LvPin } from "@src/model/entity/client/LvPin";
import { Builder } from "builder-pattern";
import { pbkdf2Async } from '@src/util/encryption';
import { Board } from "@src/model/entity/client/Board";
import { BoardRepository } from "@src/repository/client/BoardRepository";
import { uploadRequest } from "@src/controller/board/request/uploadRequest";

@Injectable()
export class BoardService {

    constructor(
        @InjectRepository(MemberRepository, config.db.client.name) private readonly memberRepository: MemberRepository,
        @InjectRepository(BoardRepository, config.db.client.name) private readonly boardRepository: BoardRepository,
        @InjectRepository(LvPinRepository, config.db.client.name) private readonly lvPinRepository: LvPinRepository,
        @InjectConnection(config.db.client.name) private readonly clientConnection: Connection,

        private readonly utilService: UtilService,
        private readonly logger: WinstonLogger,
    ) {
        logger.setContext('BoardService');
    }

    async getBoardsByMemberId(memberId: string): Promise<Board[]> {
        return await this.boardRepository.getBoardsByMemberId(memberId);
    }

    async getPublicBoards(): Promise<Board[]> {
        return await this.boardRepository.getPublicBoards();
    }

    async saveBoard(dto: uploadRequest): Promise<void> {
        if (dto.textType == 'hash') {
            const encryptedBoardText = await pbkdf2Async(dto.boardText, config.server.passwordSecret);
            dto.boardText = encryptedBoardText;
        }

        const board = Builder(Board)
            .uuid(uuidV4().toString())
            .memberId(dto.memberId)
            .textType(dto.textType)
            .paymentType(dto.paymentType)
            .isPrivate(dto.isPrivate)
            .boardText(dto.boardText)
            .nickname(dto.nickname)
            .build();

        await this.boardRepository.saveLvBoard(board);
    }
   
}