import { mailer } from "./mailer.js";

export const SubscribeEvents = async (payload) => {
  const { event, data } = JSON.parse(payload);
  console.log(data);
  let { receiver_mail } = data;

  let result = null;
  switch (event) {
    case "SEND_REPO_CREATION_MAIL":
      result = await mailer(receiver_mail);
      break;
    default:
      break;
  }
  return result;
};
