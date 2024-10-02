// import {
//   WebSocketGateway,
//   WebSocketServer,
//   SubscribeMessage,
//   //WebSocketIcon,
// } from '@nestjs/websockets';
// import { Server } from 'socket.io';
//
// @WebSocketGateway({
//   cors: {
//     origin: 'http://localhost:5000', // Замените на ваш домен
//     methods: ['GET', 'POST'],
//   },
// })
// export class ChatGateway {
//   @WebSocketServer()
//   server: Server;
//
//   @SubscribeMessage('sendMessage')
//   handleSendMessage(client: any, message: { user: string; content: string }) {
//     // Отправляем сообщение всем клиентам, кроме отправителя
//     this.server.emit('receiveMessage', message);
//   }
// }
import {
  WebSocketServer,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: 'http://localhost:5000' } }) // Убедитесь, что CORS настроен правильно
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Socket;

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, message: { user: string; content: string }) {
    this.server.emit('receiveMessage', message); // Рассылаем сообщение всем клиентам
  }
}
