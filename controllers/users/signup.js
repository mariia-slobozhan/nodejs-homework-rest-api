const { HttpCode } = require("../../config/constants");
const CustomError = require('../../config/custom-error');
const AuthService = require("../../service/auth");
const {
  EmailService,
  // eslint-disable-next-line no-unused-vars
  SenderSendgrid,
  SenderNodemailer,
} = require('../../service/email');

const authService = new AuthService();

const signup = async (req, res, next) => {
  // try {
    const { email } = req.body;
    const isUserExist = await authService.isUserExist(email);
    if (isUserExist) {
      throw new CustomError(HttpCode.CONFLICT, "User with this email is already exist");
      // return res.status(HttpCode.CONFLICT).json({
      //   status: "error",
      //   code: HttpCode.CONFLICT,
      //   message: "User with this email is already exist",
      // });
    }
    const userData = await authService.create(req.body);
    const emailService = new EmailService(process.env.NODE_ENV, new SenderNodemailer());
    const isSend = await emailService.sendVerifyEmail(email, userData.name, userData.verifyTokenEmail);
    delete userData.verifyTokenEmail;

    return res
      .status(HttpCode.CREATED)
      .json({
        status: "success",
        code: HttpCode.CREATED,
        data: { ...userData, isSendEmailVerify: isSend },
      });
  // } catch (error) {
  //   next(error);
  // }
};

module.exports = signup;
