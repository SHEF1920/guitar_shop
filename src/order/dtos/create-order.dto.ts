import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateOrderDto {
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsNumber()
  // total: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  guitarIds: number[];
}
