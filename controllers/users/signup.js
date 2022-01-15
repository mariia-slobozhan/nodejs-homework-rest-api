const {HttpCode} = require("../../config/constants");
const AuthService = require("../../service/auth");

const authService = new AuthService();

const signup = async (req, res, next) => {
  const { email } = req.body;
  const isUserExist = await authService.isUserExist(email);
  if (isUserExist) {
    return res
      .status(HttpCode.CONFLICT)
      .json({
        status: "error",
        code: HttpCode.CONFLICT,
        message: "User with this email is already exist",
      });
  }
  const data = await authService.create(req.body);
  res.status(HttpCode.OK).json({status: 'success', code: HttpCode.OK, data})
};

module.exports = signup;
