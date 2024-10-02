import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.path === '/auth/login') {
      return next();
    }

    const token = req.cookies.token; // Получаем токен из cookies

    if (!token) {
      return res.redirect('/auth/login');
    }

    next();
  }
}
