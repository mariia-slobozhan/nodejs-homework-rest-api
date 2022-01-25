const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");

class SenderSendgrid {
  async send(msg) {
    console.log('SENDGRID_API_KEY',process.env.SENDGRID_API_KEY )
    console.log('SENDGRIG_EMAIL', process.env.SENDGRIG_EMAIL )
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    return await sgMail.send({ ...msg, from: process.env.SENDGRIG_EMAIL });
  }
}

class SenderNodemailer {
  async send(msg) {
    const config = {
      host: "smtp.meta.ua",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    };
      const transporter = nodemailer.createTransport(config);
      return await transporter.sendMail({...msg, from: process.env.NODEMAILER_EMAIL })
  }
}

module.exports = {
  SenderSendgrid,
  SenderNodemailer,
};
