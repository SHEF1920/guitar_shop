import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateGuitarDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
}
