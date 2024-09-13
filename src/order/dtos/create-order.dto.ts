import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  guitarIds: number[];
}
