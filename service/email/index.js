const EmailService = require("./service");
const { SenderSendgrid, SenderNodemailer } = require("./sender");

module.exports = {
  EmailService,
  SenderSendgrid,
  SenderNodemailer,
};
