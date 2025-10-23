import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Blog REST API is running! Available endpoints: /user, /book, /category, /auth';
  }
}
