import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAllGuitars(params: { skip?: number; take?: number }) {
    const { skip, take } = params;

    return this.prisma.guitar.findMany({
      skip,
      take,
    });
  }

  async findGuitarById(id: number) {
    const guitar = await this.prisma.guitar.findUnique({
      where: { id },
    });

    if (!guitar) {
      throw new NotFoundException(`Guitar with ID ${id} not found`);
    }

    return guitar;
  }

  async deleteGuitar(id: number) {
    const guitar = await this.prisma.guitar.findUnique({
      where: { id },
    });

    if (!guitar) {
      throw new NotFoundException(`Guitar with ID ${id} not found`);
    }

    return this.prisma.guitar.delete({
      where: { id },
    });
  }
}
