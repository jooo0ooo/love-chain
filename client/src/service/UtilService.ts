import {config} from "@src/config";
import {Injectable} from "@nestjs/common";
import {InjectConnection, InjectRepository} from "@nestjs/typeorm";
import {Connection} from "typeorm";
import {WinstonLogger} from "@src/logger/WinstonLogger";
import { MemberRepository } from "@src/repository/client/MemberRepository";
import { S3Client } from "@src/service/bucket/S3Client";

@Injectable()
export class UtilService {

    constructor(
        @InjectRepository(MemberRepository, config.db.client.name) private readonly memberRepository: MemberRepository,

        @InjectConnection(config.db.client.name) private readonly clientConnection: Connection,

        private readonly s3Client: S3Client,
        private readonly logger: WinstonLogger,
    ) {
        logger.setContext('UtilService');
    }

    async uploadImgToS3(file: Express.Multer.File, fileName: string): Promise<string> {
        return await this.s3Client.uploadImage(file, fileName, config.aws.s3.privateBucketName);
    }

    async getS3SignedUrl(url: string): Promise<string> {
        return await this.s3Client.getS3SignedUrl(url, config.aws.s3.privateBucketName, 300);
    }

}