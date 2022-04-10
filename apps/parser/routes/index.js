import express from "express";

import {
  createFacebookGroupStoriesById,
  createOrUpdateAllFacebookGroupStories,
  returnAllPosts,
  writeFacebookGroupPageSourceById,
} from "../controllers";

const app = express();

app.use("/group/:groupId/extract", writeFacebookGroupPageSourceById);
app.use("/group/:groupId/update", createFacebookGroupStoriesById);
app.use("/groups/update", createOrUpdateAllFacebookGroupStories);

app.use("/posts/all", returnAllPosts);

app.use("/hello", (req, res) => {
  res.send("Hello World!");
});

app.use("/", (req, res) => {
  res.send("Not found");
});

export default app;
