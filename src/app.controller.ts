
import { Body, Post, Get, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './utils/publicAuth';

@Controller('app')
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Public()
    @Get('getHello')
    getHello(): string {
        return this.appService.getHello();
    }

    @Public()
    @Post('getAllUser')
    getAllUser(): any {
        return this.appService.findAll();
    }
}
