import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
export class CreateGuitarDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Price must be a non-negative integer' })
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
}
