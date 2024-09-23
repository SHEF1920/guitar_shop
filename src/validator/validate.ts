import { BadRequestException, PipeTransform } from '@nestjs/common';

export class IsPageNumber implements PipeTransform {
  transform(value: any): number {
    const result = parseInt(value, 10);
    if (isNaN(result)) {
      throw new BadRequestException('Value must be a number');
    }
    return result;
  }
}
