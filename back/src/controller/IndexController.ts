import { Controller, Get, Injectable } from '@nestjs/common';

@Controller()
export class IndexController {
    constructor () {/* */}

    @Get('ping')
    ping(): string {
        return 'pong';
    }
}