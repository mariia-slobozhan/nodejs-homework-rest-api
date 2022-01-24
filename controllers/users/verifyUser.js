const { HttpCode } = require("../../config/constants");
const { userRep } = require("../../repository");

const verifyUser = async (req, res, next) => {
  const verifyToken = req.params.token; // мы его передали в email service link: `${this.link}/api/users/verify/${verifyToken}`
  const userFromToken = await userRep.findByVerifyToken(verifyToken);
  if (userFromToken) {
    await userRep.updateVerify(userFromToken.id, true);
    return res
      .status(HttpCode.OK)
      .json({
        status: "success",
        code: HttpCode.OK,
        data: { message: "Success" },
      });
  }
  res
    .status(HttpCode.BAD_REQUEST)
    .json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      data: { message: "Invalid token" },
    });
};

module.exports = verifyUser;
