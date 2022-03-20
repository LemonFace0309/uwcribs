import express from 'express';
import http from 'http';

import { initApollo } from './graphql';

export const init = async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const port = 8000;

  const apollo = initApollo(httpServer);
  await apollo.start();
  apollo.applyMiddleware({
    app,
    path: '/graphql',
  });

  app.get('/', (_req, res) => {
    res.send('Hello World! :)');
  });

  httpServer.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
};
