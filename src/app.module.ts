import {
  Module,
  MiddlewareConsumer,
  RequestMethod,
  NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TimeInterceptor } from './interceptor';
import { GuitarModule } from './guitar/guitar.module';
import { OrderModule } from './order/order.module';
import { CommentModule } from './comment/comment.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './auth/auth.middleware';
import { ChatModule } from './websocket/chat.module';
import { ChatController } from './websocket/chat.controller';
import { ChatGateway } from './websocket/chat.gateway';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    GuitarModule,
    OrderModule,
    CommentModule,
    UserModule,
    AuthModule,
    ChatModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60, // Время жизни окна запросов в секундах
          limit: 10, // Максимальное количество запросов за это время
        },
      ],
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController, ChatController],
  providers: [
    PrismaService,
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeInterceptor,
    },
    ChatGateway,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, // Устанавливаем ThrottlerGuard глобально
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'api/(.*)', method: RequestMethod.ALL }, // исключаем Swagger
        { path: 'auth/(.*)', method: RequestMethod.ALL }, // если нужно исключить авторизацию
      )
      .forRoutes(
        { path: 'guitar', method: RequestMethod.POST }, // Защищённый маршрут для создания гитары
        { path: 'guitar/:id', method: RequestMethod.DELETE }, // Защищённый маршрут для удаления гитары
        { path: 'comment', method: RequestMethod.POST }, // Защищённый маршрут для создания комментария
        { path: 'comment/:id', method: RequestMethod.DELETE }, // Защищённый маршрут для удаления комментария
      );
  }
}
