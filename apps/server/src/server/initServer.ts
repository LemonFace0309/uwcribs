import cors from "cors";
import express from "express";
import http from "http";

import { attachContext, initContext } from "@src/server/context";
import { initApollo } from "@src/server/initApollo";

const port = process.env.PORT ?? 8000;

const CORS_OPTIONS: cors.CorsOptions = {
  credentials: true,
};

export const initServer = async () => {
  const app = express();
  const connections = initContext();

  app.use(cors(CORS_OPTIONS));
  const httpServer = http.createServer(app);
  app.use(attachContext(connections));

  const apollo = initApollo(httpServer);
  await apollo.start();
  apollo.applyMiddleware({
    app,
    cors: CORS_OPTIONS,
    path: "/graphql",
  });

  app.get("/", (_req, res) => {
    res.send("Hello World! :)");
  });

  httpServer.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening at http://localhost:${port}`);
  });
};
