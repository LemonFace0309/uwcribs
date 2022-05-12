import express from "express";

import {
  createFacebookGroupStoriesById,
  createOrUpdateAllFacebookGroupStories,
  returnAllPosts,
  selfHostAllImages,
  updateAllPosts,
  writeFacebookGroupPageSourceById,
} from "../controllers";

const app = express();

app.use("/group/:groupId/extract", writeFacebookGroupPageSourceById);
app.use("/group/:groupId/update", createFacebookGroupStoriesById);
app.use("/groups/update", createOrUpdateAllFacebookGroupStories);

app.use("/posts/update", updateAllPosts);
app.use("/posts/all", returnAllPosts);

app.use("/images/update", selfHostAllImages);

app.use("/hello", (req, res) => {
  res.send("Hello World!");
});

app.use("/", (req, res) => {
  res.send("Not found");
});

export default app;
