const cloudinary = require("cloudinary").v2;
const { promisify } = require("util");
const { unlink } = require('fs/promises');
const { CLOUD_FOLDER_AVATARS } = require("../../config/constants");
const { userRep } = require("../../repository");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

class CloudStorage {
  constructor(file, user) {
    this.userId = user.id;
    this.filePath = file.path;
    this.avatarCloudId = user.avatarCloudId;
    this.avatarFolder = CLOUD_FOLDER_AVATARS;
    this.uploadCloud = promisify(cloudinary.uploader.upload);
  }

  async saveFile() {
    const { public_id: returnedAvatarId, secure_url: avatarUrl } =
      await this.uploadCloud(this.filePath, {
        public_id: this.avatarCloudId,
        folder: this.avatarFolder,
      });
    const newIdAvatarCloud = returnedAvatarId.replace(
      `${this.avatarFolder}/`,
      ""
      );
      
      await userRep.updateAvatar(this.userId, avatarUrl, newIdAvatarCloud);
      // чистим папку tmp
      await this.removeUploadFile(this.filePath);
      return avatarUrl;
    }

    async removeUploadFile(filePath) {
        try {
            await unlink(filePath)
        } catch (error) {
            console.error(error.message);
        }
    }
}

module.exports = CloudStorage;
