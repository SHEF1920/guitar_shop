import { Controller, Get, Redirect, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('guitars')
  @Render('../views/guitars.hbs')
  getAuthor() {
    return {
      pageTitle: 'Guitars Page',
      content: 'views/guitars.hbs',
      isLoggedIn: false,
    };
  }

  @Get('comparison')
  @Render('../views/comparison.hbs')
  getHousingTypes() {
    return {
      pageTitle: 'Comparison',
      content: 'views/comparison.hbs',
      isLoggedIn: false,
    };
  }

  @Get('/')
  @Render('../views/index.hbs')
  @Redirect('/')
  getIndex() {
    return {
      pageTitle: 'Index Page',
      content: 'views/index.hbs',
      isLoggedIn: true,
    };
  }
}


