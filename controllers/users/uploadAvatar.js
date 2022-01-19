/* eslint-disable no-unused-vars */
const { HttpCode } = require("../../config/constants");
const {
  FileStorage,
  LocaleStorage,
  CloudStorage,
} = require("../../service/file-storage");

const uploadAvatar = async (req, res, next) => {
  const uploadService = new FileStorage(LocaleStorage, req.file, req.user);
  const avatarUrl = await uploadService.updateAvatar();
  res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: { avatarUrl } });
};

module.exports = uploadAvatar;
