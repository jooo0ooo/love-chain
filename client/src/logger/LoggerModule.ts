import { Module } from '@nestjs/common';
import { WinstonLogger } from '@src/logger/WinstonLogger';

@Module({
    providers: [WinstonLogger],
    exports: [WinstonLogger],
})
export class LoggerModule {}
