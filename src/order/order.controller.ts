import { Controller, Post, Body, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { AddGuitarToOrderDto } from './dtos/add-guitar-to-order.dto'
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
  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({
    status: 200,
    description: 'Returns all orders.',
  })
  @Get()
  getOrders() {
    return this.orderService.getOrders();
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
