import {Injectable} from "@nestjs/common";
import * as AWS from "aws-sdk";
import {WinstonLogger} from "@src/logger/WinstonLogger";
import {objectToString} from "@src/util/conversion";
import { InvalidValueException } from "@src/exception/InvalidValueException";
import * as AmazonS3URI from "amazon-s3-uri";

@Injectable()
export class S3Client {
    private readonly s3Client: AWS.S3;

    constructor(
        private readonly logger: WinstonLogger,
    ) {
        logger.setContext('S3Client');
        AWS.config.region = 'ap-northeast-2';
        this.s3Client = new AWS.S3();
    }
    async uploadImage(file: Express.Multer.File, filename: string, bucket: string): Promise<string> {
        try {
            const param: AWS.S3.PutObjectRequest = {
                'Bucket': bucket,
                'Key': filename,
                'Body':file.buffer,
            };
            const { Location } = await this.s3Client.upload(param).promise();
            return Location;
        } catch (error) {
            this.logger.error(`failed to upload image to s3, error: ${error}`);
            throw new InvalidValueException('failed to upload image');
        }
    }

    async getS3SignedUrl(imageUrl: string, bucket: string, expires: number): Promise<string> {
        let imageKey;

        try {
            const amazonS3Params = AmazonS3URI(imageUrl);
            this.logger.log(`split s3 image url success, { "params": ${objectToString(amazonS3Params)}} `);
            imageKey = amazonS3Params.key;
        } catch (error) {
            this.logger.error(`invalid s3 image url, imageUrl: ${imageUrl}, error: ${error}`);
            throw new InvalidValueException();
        }

        try {
            const signedUrl = await this.s3Client.getSignedUrlPromise('getObject', {
                Bucket: bucket,
                Key: imageKey,
                Expires: expires,
            });

            this.logger.log(`convert to signedUrl success, {imageUrl: "${signedUrl}" }`);

            return signedUrl;
        } catch (error) {
            this.logger.error(`failed to get s3 signed image url, imageUrl: ${imageUrl}, imageKey: ${imageKey}, error: ${error}`);
            throw new InvalidValueException();
        }
    }
}
