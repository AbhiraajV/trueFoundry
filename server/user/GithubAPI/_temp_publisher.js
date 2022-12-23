import * as amqp from "amqplib";

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

// subscriber & publisher
export const PublishMessages = async (channel, binding_key, messages) => {
  try {
    await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(messages));
    console.log("Message sent ", messages);
  } catch (error) {
    throw error;
  }
};
const channel = await CreateChannel();
const publish_wait = await PublishMessages(
  channel,
  GH_SERVICE_BINDING_KEY,
  JSON.stringify({
    event: "CREATE_REPO_WITH_FILES",
    data: {
      key: "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",
      gh_username: "AbhiraajV",
      gh_repo: "test" + Date.now(),
      gh_filename: "someFile.py",
    },
  })
);
