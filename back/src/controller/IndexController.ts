import { Controller, Get, Injectable } from '@nestjs/common';

@Controller()
export class IndexController {
    constructor () {/* */}

    @Get('')
    root(): any {
        return {message: 'Hello world'};
    }
}