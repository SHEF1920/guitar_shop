import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async createComment(createCommentDto: CreateCommentDto) {
    const newComment = await this.prisma.comment.create({
      data: {
        guitarId: createCommentDto.guitarId,
        content: createCommentDto.content,
        userId: createCommentDto.userId,
      },
    });
    return newComment;
  }

  // Получить все комментарии
  async findAllComments() {
    return this.prisma.comment.findMany({
      include: {
        guitar: true, // Включаем информацию о гитаре
        user: true, // Включаем информацию о пользователе
      },
    });
  }

  // Удалить комментарий по его ID
  async deleteComment(id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found.`);
    }

    return this.prisma.comment.delete({
      where: { id },
    });
  }
}
