import express from "express";
import { CreateChannel, SubscribeToMessages } from "./ampq.js";
import { SubscribeEvents } from "./subscriber_helper.js";
const app = express();
const port = 8082;

app.get("/", (req, res) => {
  res.send("email service api!");
});

const channel = await CreateChannel();
SubscribeToMessages(channel, SubscribeEvents);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
