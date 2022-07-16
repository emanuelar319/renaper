import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*', methods: ["GET", "POST"]} })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer()
  server: Server
  
  handleConnection(client: any) {
    console.log('Usuario conectado');  
  }

  handleDisconnect(client: any) {
    console.log('Usuario desconectado');
  }

  // Canal finalizar-examen - Indica que se debe finalizar un examen
  @SubscribeMessage('testing')
  testing(socket: Socket, data: any){
    console.log(data);
    this.server.emit('emit-testing', data); // Se emite a un nuevo canal llamado 'emit-testing'  
  }
  
}
