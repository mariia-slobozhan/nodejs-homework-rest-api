const { HttpCode } = require("../../config/constants");
const AuthService = require("../../service/auth");
const authService = new AuthService();

const logout = async (req, res, next) => {
  await authService.setToken(req.user.id, null);
  return res
    .status(HttpCode.NO_CONTENT)
    .json();
};

module.exports = logout;