import { Injectable } from '@nestjs/common';
import { CreateGuitarDto } from './dtos/create-guitar.dto';
//import { Prisma } from '@prisma/client';

@Injectable()
export class GuitarService {
  private guitars = [];

  createGuitar(createGuitarDto: CreateGuitarDto) {
    const newGuitar = { id: Date.now(), ...createGuitarDto };
    this.guitars.push(newGuitar);
    return newGuitar;
  }

  findAllGuitars() {
    return this.guitars;
  }
}
