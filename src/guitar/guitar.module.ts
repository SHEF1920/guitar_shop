import { Module } from '@nestjs/common';
import { GuitarController } from './guitar.controller';
import { GuitarService } from './guitar.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [GuitarController],
  providers: [GuitarService, PrismaService],
})
export class GuitarModule {}
