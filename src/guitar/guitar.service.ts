import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGuitarDto } from './dtos/create-guitar.dto';

@Injectable()
export class GuitarService {
  constructor(private prisma: PrismaService) {}

  async createGuitar(createGuitarDto: CreateGuitarDto) {
    const newGuitar = await this.prisma.guitar.create({
      data: {
        name: createGuitarDto.name,
        price: createGuitarDto.price,
        description: createGuitarDto.description,
      },
    });
    return newGuitar;
  }

  async findAllGuitars() {
    return this.prisma.guitar.findMany();
  }
}
