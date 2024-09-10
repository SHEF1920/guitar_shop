import { Controller, Get, Post, Body } from '@nestjs/common';
import { GuitarService } from './guitar.service';
import { CreateGuitarDto } from './dtos/create-guitar.dto';

@Controller('guitar')
export class GuitarController {
  constructor(private readonly guitarService: GuitarService) {}

  @Post()
  create(@Body() createGuitarDto: CreateGuitarDto) {
    return this.guitarService.createGuitar(createGuitarDto);
  }

  @Get()
  findAll() {
    return this.guitarService.findAllGuitars();
  }
}
