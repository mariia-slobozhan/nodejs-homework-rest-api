const { HttpCode } = require("../../config/constants");
const AuthService = require("../../service/auth");
const CustomError = require('../../config/custom-error');
const authService = new AuthService();

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await authService.getUser(email, password);
  if (!user) {
    throw new CustomError(HttpCode.UNAUTHORIZED, "Invalid credantials");
    // return res.status(HttpCode.UNAUTHORIZED).json({
    //   status: "error",
    //   code: HttpCode.UNAUTHORIZED,
    //   message: "Invalid credantials",
    // });
  }
  const token = authService.getToken(user);
  await authService.setToken(user.id, token);
  res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: { token } });
};

module.exports = login;
