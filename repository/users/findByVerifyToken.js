const User = require("../../models/User");

const findByVerifyToken = async (verifyTokenEmail) => {
  return await User.findOne({ verifyTokenEmail });
};

module.exports = findByVerifyToken;