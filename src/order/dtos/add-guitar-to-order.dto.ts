import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddGuitarToOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  orderId: number; // ID заказа

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  guitarId: number; // ID гитары
}
