import express from "express";
import mongoose from "mongoose";

import "dotenv/config";

import { startup } from "./driver";
import { logEntities } from "./nlp";
import router from "./routes";

const app = express();

const PORT = process.env.PORT || 9999;

Array.range = function (n) {
  return Array.apply(null, Array(n)).map((x, i) => i);
};
Object.defineProperty(Array.prototype, "chunk", {
  value: function (n) {
    return Array.range(Math.ceil(this.length / n)).map((x, i) =>
      this.slice(i * n, i * n + n)
    );
  },
});

startup();
logEntities();

app.use(express.json());

mongoose.connect(`${process.env.MONGO_CONNECTION}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", function () {
  console.log("Error: Could not connect to MongoDB."); // eslint-disable-line no-console
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Parser listening on port ${PORT}`); // eslint-disable-line no-console
});
