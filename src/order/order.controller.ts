import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe, Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { AddGuitarToOrderDto } from './dtos/add-guitar-to-order.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Create new order' })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict. Guitar is already in another order.',
  })
  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @ApiOperation({ summary: 'Get order by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns a order by ID.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        total: { type: 'number' },
        userId: { type: 'number' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        guitars: {
          type: 'array',
          items: { type: 'number' },
        },
      },
    },
  })
  @Get('/:id')
  findOrder(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOrderById(id);
  }

  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({
    status: 200,
    description: 'Returns all orders.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        total: { type: 'number' },
        userId: { type: 'number' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        guitars: {
          type: 'array',
          items: { type: 'number' },
        },
      },
    },
  })
  @Get()
  getOrders(
    @Query('skip') skip?: number, // Параметры для пагинации
    @Query('take') take?: number,
  ) {
    return this.orderService.getOrders({
      skip: Number(skip) || 0, // Значение по умолчанию — 0
      take: Number(take) || 10, // Значение по умолчанию — 10
    });
  }

  @ApiOperation({ summary: 'Add guitar to order' })
  @ApiResponse({
    status: 200,
    description: 'Guitar successfully added to the order.',
  })
  @Post('add-guitar')
  addGuitarToOrder(@Body() addGuitarToOrderDto: AddGuitarToOrderDto) {
    return this.orderService.addGuitarToOrder(addGuitarToOrderDto);
  }
}
