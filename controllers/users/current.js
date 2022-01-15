const {HttpCode} = require("../../config/constants");


const getCurrentUser = async (req, res, next) => {
   return await res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: { email: req.user.email,
  subscription: req.user.subscription } });

};

module.exports = getCurrentUser;
