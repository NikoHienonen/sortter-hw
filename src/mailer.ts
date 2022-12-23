import nodemailer from "nodemailer";
import { Issue } from "./types";

export const mailer = async () => {
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
};

export const sendMail = async (issue: Issue) => {
  try {
    const transporter = await mailer();
    const info = await transporter.sendMail({
      from: "Issues server",
      to: "<insert mail here>",
      subject: "New issue created",
      text: issue.description,
    });
    console.log(`Message sent: ${info.messageId}`);
  } catch (error) {
    console.error(error);
    throw new Error("error");
  }
};
