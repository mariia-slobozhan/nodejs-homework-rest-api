const User = require("../../models/User");

const updateVerify = async (id, status) => {
  return await User.updateOne({ _id: id }, { isVerify: status, verifyTokenEmail: null });
};

module.exports = updateVerify;
