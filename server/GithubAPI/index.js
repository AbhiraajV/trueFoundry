import GithubRepoManager from "./github.js";
import express from "express";
import { CreateChannel, SubscribeToMessages } from "./subscriber.js";
import { SubscribeEvents as subscriber_helper } from "./subscriber_helper.js";

const app = express();
const port = 8081;

app.get("/", (req, res) => {
  res.send("github communication api!");
});

const channel = await CreateChannel();
SubscribeToMessages(channel, subscriber_helper);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
