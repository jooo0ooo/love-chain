import { Controller, Get } from '@nestjs/common';
import { WinstonLogger } from '@src/logger/WinstonLogger';

@Controller()
export class IndexController {
    constructor (
        private readonly logger: WinstonLogger
    ) {
        this.logger.setContext('IndexController');
    }

    @Get('ping')
    ping(): string {
        return 'pong';
    }
}