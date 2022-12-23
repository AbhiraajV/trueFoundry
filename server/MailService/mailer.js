import * as nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "mailing23r877@gmail.com",
    pass: "iphaxgympdusnwsi",
  },
});
export async function mailer(receiver_mail) {
  return await transporter
    .sendMail({
      from: "mailing23r877@gmail.com",
      to: receiver_mail,
      subject: "git repo created ✔",
      text: "visit the repo!!",
      html: '<b><a href="google.com">your repo</a></b>',
    })
    .then((data) => {
      return { data, ackMsg: true };
    })
    .catch((err) => {
      console.log({ err });

      return { data: err, ackMsg: false };
    });
}
