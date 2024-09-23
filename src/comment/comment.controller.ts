import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  NotFoundException, Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: 'Create new comment' })
  @ApiResponse({
    status: 201,
    description: 'The comment has been successfully created.',
  })
  @ApiResponse({
    status: 403,
    description: 'The user does not have access to create a comment.',
  })
  @UseGuards(AuthGuard)
  @Post()
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }

  @ApiOperation({ summary: 'Get all comments' })
  @ApiResponse({
    status: 200,
    description: 'Returns all comments.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          content: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          userId: { type: 'number' },
          guitarId: { type: 'number' },
        },
      },
    },
  })
  @Get()
  findAllComments(
    @Query('skip') skip?: number, // Параметры для пагинации
    @Query('take') take?: number,
  ) {
    return this.commentService.findAllComments({
      skip: Number(skip) || 0, // Значение по умолчанию — 0
      take: Number(take) || 10, // Значение по умолчанию — 10
    });
  }

  @Get('guitar/:guitarId')
  @ApiOperation({ summary: 'Get all comments for a specific guitar' })
  @ApiResponse({
    status: 200,
    description: 'Returns all comments for the specified guitar',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          content: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          userId: { type: 'number' },
          guitarId: { type: 'number' },
        },
      },
    },
  })
  getCommentsByGuitar(@Param('guitarId', ParseIntPipe) guitarId: number) {
    return this.commentService.getCommentsByGuitar(guitarId);
  }

  @ApiOperation({ summary: 'Delete a comment by ID' })
  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully deleted.',
  })
  @ApiResponse({
    status: 403,
    description: 'The user does not have access to delete a comment.',
  })
  @ApiResponse({
    status: 404,
    description: 'Comment not found.',
  })
  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteComment(@Param('id') id: number) {
    const result = await this.commentService.deleteComment(Number(id));
    if (!result) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return { message: `Comment with ID ${id} deleted successfully` };
  }
}
