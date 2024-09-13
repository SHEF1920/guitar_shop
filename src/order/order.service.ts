import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Путь к PrismaService
import { Order } from '@prisma/client';
import { CreateOrderDto } from './dtos/create-order.dto'; // Импорт DTO

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  // Получить один заказ по уникальному идентификатору
  async getOrder(orderId: number): Promise<Order | null> {
    return this.prisma.order.findUnique({
      where: { id: orderId },
      //include: { guitars: true }, // Включаем связанные гитары
    });
  }

  // Получить список всех заказов
  async getOrders(): Promise<Order[]> {
    return this.prisma.order.findMany({
      //include: { guitars: true }, // Включаем связанные гитары
    });
  }

  // Создать новый заказ, используя CreateOrderDto
  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { total, userId, guitarIds } = createOrderDto;

    // Проверяем, что гитары не уже связаны с другими заказами
    for (const guitarId of guitarIds) {
      const guitar = await this.prisma.guitar.findUnique({
        where: { id: guitarId },
      });

      if (guitar && guitar.orderId) {
        throw new Error(
          `Guitar with ID ${guitarId} is already in another order`,
        );
      }
    }

    return this.prisma.order.create({
      data: {
        total,
        user: {
          connect: { id: userId }, // Соединение заказа с пользователем
        },
        guitars: {
          connect: guitarIds.map((id) => ({ id })), // Связываем заказ с гитарами по их id
        },
      },
    });
  }

  // Обновить существующий заказ
  async updateOrder(
    orderId: number,
    updateData: Partial<CreateOrderDto>,
  ): Promise<Order> {
    return this.prisma.order.update({
      where: { id: orderId },
      data: updateData,
    });
  }

  // Удалить заказ
  async deleteOrder(orderId: number): Promise<Order> {
    return this.prisma.order.delete({
      where: { id: orderId },
    });
  }
}
