// import {
//   WebSocketGateway,
//   WebSocketServer,
//   SubscribeMessage,
//   OnGatewayInit,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
// } from '@nestjs/websockets';
// import { Logger, UseGuards } from '@nestjs/common';
// import { Socket, Server } from 'socket.io';
// import { GuitarService } from '../guitar/guitar.service'; // Сервис для работы с гитарами
// import { AuthGuard } from '../guards/auth.guard';
//
// @WebSocketGateway({
//   cors: {
//     origin: '*', // Разрешаем любые источники, но лучше заменить на нужный домен
//   },
// })
// @UseGuards(AuthGuard) // Применение Guards для авторизации WebSocket соединений
// export class GuitarGateway
//   implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
// {
//   @WebSocketServer() server: Server;
//   private logger: Logger = new Logger('GuitarGateway');
//
//   constructor(private readonly guitarService: GuitarService) {}
//
//   // Метод для отправки обновлений всем клиентам при изменении данных о гитарах
//   notifyGuitarUpdate(payload: any) {
//     this.server.emit('guitarUpdate', payload);
//   }
//
//   // Обработчик для клиентских сообщений, можно добавить дополнительную логику
//   @SubscribeMessage('msgToServer')
//   handleMessage(client: Socket, payload: string): void {
//     this.server.emit('msgToClient', payload);
//   }
//
//   // Инициализация WebSocket сервера
//   afterInit(server: Server) {
//     this.logger.log('WebSocket server initialized');
//   }
//
//   // Обработка отключения клиента
//   handleDisconnect(client: Socket) {
//     this.logger.log(`Client disconnected: ${client.id}`);
//   }
//
//   // Обработка подключения клиента
//   handleConnection(client: Socket, ...args: any[]) {
//     this.logger.log(`Client connected: ${client.id}`);
//   }
// }
