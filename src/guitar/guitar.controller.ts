import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  ParseIntPipe,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GuitarService } from './guitar.service';
import { CreateGuitarDto } from './dtos/create-guitar.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';

@ApiTags('Guitar')
@Controller('guitar')
export class GuitarController {
  constructor(private readonly guitarService: GuitarService) {}

  @ApiOperation({ summary: 'Create new guitar' })
  @ApiResponse({
    status: 201,
    description: 'The guitar has been successfully created.',
  })
  @ApiResponse({
    status: 403,
    description: 'The user does not have access to create an order.',
  })
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createGuitarDto: CreateGuitarDto) {
    return this.guitarService.createGuitar(createGuitarDto);
  }

  @ApiOperation({ summary: 'Get all guitars' })
  @ApiResponse({
    status: 401,
    description: 'The user is not authorized to perform this action.',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all profiles.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        price: { type: 'number' },
        description: { type: 'string' },
        orderId: { type: 'number' },
      },
    },
  })
  @Get()
  findAll(
    @Query('skip') skip?: number, // Добавлены параметры пагинации через query string
    @Query('take') take?: number,
  ) {
    return this.guitarService.findAllGuitars({
      skip: Number(skip) || 0, // Обработка query параметров
      take: Number(take) || 10, // Установка значения по умолчанию
    });
  }

  @ApiOperation({ summary: 'Get guitar by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns a guitar by ID.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        price: { type: 'number' },
        description: { type: 'string' },
        orderId: { type: 'number' },
      },
    },
  })
  @Get('/:id')
  findGuitar(@Param('id', ParseIntPipe) id: number) {
    return this.guitarService.findGuitarById(id);
  }

  @ApiOperation({ summary: 'Delete guitar by ID' })
  @ApiResponse({
    status: 200,
    description: 'The guitar has been successfully deleted.',
  })
  @ApiResponse({
    status: 403,
    description: 'The user does not have access to delete an order.',
  })
  @UseGuards(AuthGuard)
  @Delete('/:id')
  deleteGuitar(@Param('id', ParseIntPipe) id: number) {
    return this.guitarService.deleteGuitar(id);
  }
}
