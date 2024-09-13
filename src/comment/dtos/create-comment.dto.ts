import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateCommentDto {
  @IsNotEmpty()
  @IsNumber()
  guitarId: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}