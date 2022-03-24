import cors from "cors";
import express from "express";
import http from "http";

import { initApollo } from "@src/server/graphql";

const port = 8000;

const CORS_OPTIONS: cors.CorsOptions = {
  credentials: true,
};

export const init = async () => {
  const app = express();
  app.use(cors(CORS_OPTIONS));
  const httpServer = http.createServer(app);

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
