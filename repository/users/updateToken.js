const User = require("../../models/User");

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

module.exports = updateToken;
