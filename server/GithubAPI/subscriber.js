import * as amqp from "amqplib";
import { PublishMessages } from "./publish_mail.js";

const rbq_connection_uri =
  "amqps://xsracole:Xhv1RXdF5GVSwOCRfqNp785dauTCuxkC@puffin.rmq2.cloudamqp.com/xsracole";

const EXCHANGE_NAME = "true_foundry";

const QUEUE_NAME = "gh_service_queue";
const GH_SERVICE_BINDING_KEY = "GH_SERVICE_BINDING_KEY";
export const CreateChannel = async () => {
  try {
    // create a connection to rbmq client
    const rbq_client = await amqp.connect(rbq_connection_uri);
    console.log("RabbitMQ Client Connected");
    // create a channel over which msgs are send
    const channel = await rbq_client.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "direct", false);
    console.log("Channel Established");
    return channel;
  } catch (error) {
    console.log({ error });
    throw error;
  }
};
// create a queue which holds these msgs to be sent

// subscriber

export const SubscribeToMessages = async (channel, service) => {
  try {
    const appQueue = await channel.assertQueue(QUEUE_NAME);
    channel.bindQueue(appQueue.queue, EXCHANGE_NAME, GH_SERVICE_BINDING_KEY);
    channel.consume(appQueue.queue, async (data) => {
      console.log("\n \n ========Received Data======== \n \n");
      console.log(data.content.toString());

      console.log("\n \n ======== Calling Requested Service ======== \n \n");

      await service(data.content.toString())
        .then(async (res) => {
          console.log({ res });
          if (res.ackMsg) {
            channel.ack(data);
            const {
              data: {
                event,
                data: { email },
              },
            } = JSON.parse(data.content.toString());
            console.log(
              "\n \n ======== Acknowledged Requested Service ======== \n \n"
            );

            console.log(
              "\n \n ======== Publishing Mail Service for " +
                email +
                "======== \n \n"
            );
            await PublishMessages(
              channel,
              JSON.stringify({
                event: "SEND_REPO_CREATION_MAIL",
                data: {
                  receiver_mail: email,
                },
              })
            );
          } else console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  } catch (error) {
    throw error;
  }
};
