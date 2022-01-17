const Jimp = require("jimp");

class FileStorage {
  constructor(Storage, file, user) {
    this.storage = new Storage(file, user);
    this.pathFile = file.path;
  }

    async updateAvatar() {
        await this.transformAvatar(this.pathFile);
        const userAvatar = await this.storage.saveFile();
        return userAvatar;
  }

  async transformAvatar(pathFile) {
    const image = await Jimp.read(pathFile);
    await image
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(pathFile);
  }
}

module.exports = FileStorage;
