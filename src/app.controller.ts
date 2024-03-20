import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getHello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('getName')
  getName(@Body() params): string {
    return `hello ${params.name}`;
  }
}
