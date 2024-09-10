import { Module } from '@nestjs/common';
import { GuitarController } from './guitar.controller';
import { GuitarService } from './guitar.service';

@Module({
  controllers: [GuitarController],
  providers: [GuitarService],
})
export class GuitarModule {}
