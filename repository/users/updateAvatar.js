const User = require("../../models/User");

const updateAvatar = async (id, avatar, avatarCloudId = null) => {
  return await User.updateOne({ _id: id }, { avatar, avatarCloudId });
};

module.exports = updateAvatar;
