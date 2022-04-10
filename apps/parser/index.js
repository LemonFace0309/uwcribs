import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import { startup } from "./driver";
import { logEntities } from "./nlp";
import router from "./routes";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 9999;

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
  console.log(`Example app listening on port ${PORT}`); // eslint-disable-line no-console
});
