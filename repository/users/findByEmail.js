const User = require("../../models/User");

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

module.exports = findByEmail;
