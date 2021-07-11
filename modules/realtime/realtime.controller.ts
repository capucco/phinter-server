import redis from 'redis';
import { Server, Socket } from 'socket.io';

export const realtime = (io: Server) => {
  const redisClient = redis.createClient();

  redisClient.subscribe('post');

  redisClient.on('message', (channel, message) => {
    io.to('users').emit(channel, message);
  });

  io.on('connection', (socket: Socket) => {
    socket.join('users');
  });
};
