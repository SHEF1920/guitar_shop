import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
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
  @UseGuards(AuthGuard)
  @Post()
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }

  @ApiOperation({ summary: 'Get all comments' })
  @ApiResponse({
    status: 200,
    description: 'Returns all comments.',
  })
  @Get()
  findAllComments() {
    return this.commentService.findAllComments();
  }

  @ApiOperation({ summary: 'Delete a comment by ID' })
  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully deleted.',
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
