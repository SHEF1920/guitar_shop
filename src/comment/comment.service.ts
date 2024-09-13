import { Injectable } from '@nestjs/common';
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
}
