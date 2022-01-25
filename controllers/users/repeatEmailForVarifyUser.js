const { HttpCode } = require("../../config/constants");
const CustomError = require('../../config/custom-error');
const { userRep } = require("../../repository");
const {
  EmailService,
  // eslint-disable-next-line no-unused-vars
  SenderSendgrid,
  SenderNodemailer,
} = require("../../service/email");

const repeatEmailForVerifyUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await userRep.findByEmail(email);
  if (user) {
    const { email, name, verifyTokenEmail } = user;
    const emailService = new EmailService(
      process.env.NODE_ENV,
      new SenderNodemailer()
    );
    const isSend = await emailService.sendVerifyEmail(
      email,
      name,
      verifyTokenEmail
    );
    if (isSend) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: { message: "Success", isSendEmailVerify: isSend },
      });
    }
    throw new CustomError(HttpCode.SERVICE_UNAVAILABLE, "Service anavailable");
    // res.status(HttpCode.SERVICE_UNAVAILABLE).json({
    //   status: "error",
    //   code: HttpCode.SERVICE_UNAVAILABLE,
    //   data: { message: "Service anavailable" },
    // });
  }
  throw new CustomError(HttpCode.NOT_FOUND, "User with this email not found");

  // res.status(HttpCode.NOT_FOUND).json({
  //   status: "error",
  //   code: HttpCode.NOT_FOUND,
  //   data: { message: "User with this email not found" },
  // });
};

module.exports = repeatEmailForVerifyUser;
