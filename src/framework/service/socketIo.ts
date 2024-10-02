import { Server, Socket } from 'socket.io';
import { allowedOrigins, app } from "../webServer/config/app";
import http from 'http';

export const server = http.createServer(app);
export const io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
      credentials: true
    }
  });

io.on('connection', (socket: Socket) => { 
    console.log('A user connected');

    
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
