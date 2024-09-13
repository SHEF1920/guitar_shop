import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Импорт PrismaService
import { UserService } from './user.service'; // Импорт UserService
import { UserController } from './user.controller'; // Импорт UserController

@Module({
  imports: [], // Можно добавить другие модули, если они необходимы
  controllers: [UserController], // Подключаем контроллер для обработки HTTP-запросов
  providers: [UserService, PrismaService], // Добавляем UserService и PrismaService в провайдеры
})
export class UserModule {}
