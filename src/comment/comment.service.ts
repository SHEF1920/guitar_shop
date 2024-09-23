import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { Comment } from '@prisma/client';

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
  async findAllComments(params: { skip?: number; take?: number }) {
    const { skip, take } = params;
    return this.prisma.comment.findMany({
      skip,
      take,
      include: {
        guitar: true, // Включаем информацию о гитаре
        user: true, // Включаем информацию о пользователе
      },
    });
  }

  async getCommentsByGuitar(guitarId: number): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      where: { guitarId },
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
