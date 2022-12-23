const EXCHANGE_NAME = "true_foundry";

export const PublishMessages = async (channel, messages) => {
  try {
    await channel.publish(
      EXCHANGE_NAME,
      "MAIL_SERVICE_BINDING_KEY",
      Buffer.from(messages)
    );
    console.log("Message sent ", messages);
  } catch (error) {
    throw error;
  }
};
// const publish_wait = await PublishMessages(
//   channel,
//   GH_SERVICE_BINDING_KEY,
//   JSON.stringify({
//     event: "CREATE_REPO_WITH_FILES",
//     data: {
//       key: "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",
//       gh_username: "AbhiraajV",
//       gh_repo: "test" + Date.now(),
//       gh_filename: "someFile.py",
//     },
//   })
// );
