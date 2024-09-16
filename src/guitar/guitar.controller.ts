import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { GuitarService } from './guitar.service';
import { CreateGuitarDto } from './dtos/create-guitar.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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
  })
  @Get()
  findAll() {
    return this.guitarService.findAllGuitars();
  }

  @ApiOperation({ summary: 'Get guitar by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns a guitar by ID.',
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
  @Delete('/:id')
  deleteGuitar(@Param('id', ParseIntPipe) id: number) {
    return this.guitarService.deleteGuitar(id);
  }
}
