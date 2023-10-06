import nodemailer from "nodemailer";
import { google } from "googleapis";

const { OAuth2 } = google.auth; //extracting auth2 from google package
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

//now we are going to extract all the info that we have in .env
const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = prcess.env;

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);

//now we can send an email

export const sendEmail = (to, url, txt, subject) => {
  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
  });
  const accessToken = oauth2Client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_EMAIL_ADDRESS,
      clientId: MAILING_SERVICE_CLIENT_ID,
      clientSecret: MAILING_SERVICE_CLIENT_SECRET,
      refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
      accessToken,
    },
  });
  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to: to, //we have that as a parameter so the value will change as we will be passing that to our function
    subject: subject,
    html: "",
  };
  smtpTransport.sendEmail(mailOptions, (error, infos) => {
    if (err) return err;
    return infos;
  });
};