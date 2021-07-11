import http from 'http';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { Server } from 'socket.io';
import * as bodyParser from 'body-parser';

import './config';
import { tooBusy } from './middlewares';
import { realtime, router } from './modules';

const isDev = process.env.NODE_ENV === 'development';

(async () => {
  const app = express();
  const serverPort = process.env.SERVER_PORT || 5000;
  const realtimeServer = http.createServer();
  const realtimePort = process.env.REALTIME_PORT || 4000;

  const io = new Server(realtimeServer, {
    cors: {
      origin: '*',
    },
  });

  realtime(io);

  if (!isDev) {
    app.use(tooBusy);
  }

  app.use(bodyParser.json());
  app.use(cors());
  app.use(morgan(isDev ? 'dev' : 'combined'));
  app.use('/api', router);
  app.use((err, req, res, next) => {
    res.status(498);
    res.json({ error: err.message });
  });

  await app.listen(serverPort);
  // eslint-disable-next-line no-console
  console.log(`> Express server listening on port: ${serverPort}`);

  realtimeServer.listen(realtimePort, () => {
    // eslint-disable-next-line no-console
    console.log(`> Websocket server listening on port: ${realtimePort}`);
  });
})();
