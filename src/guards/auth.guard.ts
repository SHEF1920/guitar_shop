// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Observable } from 'rxjs';
//
// @Injectable()
// export class AuthGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const authHeader = request.headers.authorization;
//
//     // Простая проверка наличия заголовка Authorization
//     if (!authHeader || authHeader !== 'valid_token') {
//       return false;
//     }
//
//     return true;
//   }
// }
