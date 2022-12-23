// USE PUBLISHER IN GH_SERVICE
// import * as amqp from "amqplib";

// const rbq_connection_uri =
//   "amqps://xsracole:Xhv1RXdF5GVSwOCRfqNp785dauTCuxkC@puffin.rmq2.cloudamqp.com/xsracole";

// const EXCHANGE_NAME = "true_foundry";

// const MAIL_SERVICE_BINDING_KEY = "MAIL_SERVICE_BINDING_KEY";
// export const CreateChannel = async () => {
//   try {
//     // create a connection to rbmq client
//     const rbq_client = await amqp.connect(rbq_connection_uri);
//     console.log("RabbitMQ Client Connected");
//     // create a channel over which msgs are send
//     const channel = await rbq_client.createChannel();
//     await channel.assertExchange(EXCHANGE_NAME, "direct", false);
//     console.log("Channel Established");
//     return channel;
//   } catch (error) {
//     console.log({ error });
//     throw error;
//   }
// };
// // create a queue which holds these msgs to be sent

// // subscriber & publisher
// export const PublishMessages = async (channel, binding_key, messages) => {
//   try {
//     await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(messages));
//     console.log("Message sent ", messages);
//   } catch (error) {
//     throw error;
//   }
// };
// const channel = await CreateChannel();
// const publish_wait = await PublishMessages(
//   channel,
//   MAIL_SERVICE_BINDING_KEY,
//   JSON.stringify({
//     event: "SEND_REPO_CREATION_MAIL",
//     data: {
//       receiver_mail: "abhiraajverma@gmail.com",
//     },
//   })
// );
// USE
