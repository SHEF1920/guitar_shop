import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateGuitarDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  description: string;
}
