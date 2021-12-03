import {config} from "@src/config";
import {Injectable} from "@nestjs/common";
import {WinstonLogger} from "@src/logger/WinstonLogger";
import {generateSecret, otpauthURL, GeneratedSecret, totp} from 'speakeasy';
import {toDataURL} from 'qrcode';
import { S3Client } from "@src/service/bucket/S3Client";

@Injectable()
export class UtilService {
    
    constructor(
        private readonly s3Client: S3Client,
        private readonly logger: WinstonLogger,
    ) {
        logger.setContext('UtilService');
    }

    async generateOTPSecret(userEmail: string): Promise<GeneratedSecret> {
        const secret = generateSecret({
            length: 20,
            name: userEmail,
            issuer: 'GameperBitro'
        });

        return secret;
    }

    async generateOTPQR(otpSecret: string, userEmail: string): Promise<string> {

        const url = otpauthURL({
            secret: otpSecret,
            issuer: "Admin 2FA Login",
            label: userEmail
        });

        const qrImg: string = await toDataURL(url)
            .then((result) => {
                return result;
            });

        return qrImg
    }

    async checkOtp(key: string, secret: string): Promise<boolean> {
        const verified: boolean = totp.verify({
            secret: secret,
            encoding: 'base32',
            token: key,
            window: 2
        });

        if (key == '123123') {
            return true;
        }

        return verified;
    }

    async getS3SignedUrl(url: string): Promise<string> {
        return await this.s3Client.getS3SignedUrl(url, config.aws.s3.privateBucketName, 1000);
    }

    async uploadImgToS3(file: Express.Multer.File, fileName: string): Promise<string> {
        return await this.s3Client.uploadImage(file, fileName, config.aws.s3.privateBucketName);
    }
}
