const { HttpCode } = require("../../config/constants");
const AuthService = require("../../service/auth");
const authService = new AuthService();

const updateSubscription = async (req, res, next) => {
  const { id } = req.user;
  const userUpdated = await authService.updateUserSubscription(id, req.body);
  if (userUpdated) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { userUpdated } });
  }
  res
    .status(HttpCode.BAD_REQUEST)
    .json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: "Bad request",
    });
};

module.exports = updateSubscription;
