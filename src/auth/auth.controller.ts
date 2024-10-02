import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Render,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  @Render('login') // Рендер формы для входа
  getLogin() {
    return { message: 'Please login' };
  }

  @Get('register')
  @Render('register') // Рендер формы для регистрации
  getRegister() {
    return { message: 'Please register' };
  }

  @Post('login')
  async login(@Body() req, @Response() res) {
    const user = await this.authService.validateUser(req.email, req.password);
    if (user) {
      const token = await this.authService.login(user);

      // Устанавливаем токен в cookie
      res.cookie('token', token.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000, // Время жизни cookie (1 час)
      });

      return res.redirect('/');
      //return { access_token: token.access_token };
    } else {
      return { message: 'Invalid credentials' };
    }
  }

  @Post('register')
  async register(@Body() req) {
    return this.authService.register(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('protected')
  getProtected(@Request() req) {
    return req.user;
  }
}
