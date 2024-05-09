import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next
      .handle()
      .pipe(map((data) => ({ ...data, backendTime: Date.now() - now })));
    // цепочка обработки запросов
    // функция tap() выполняется после завершения обработки запроса и добавляет HTTP заголовок Server-Timing к ответу
    // При этом результат выполнения next.handle() не изменяется
  }
}
