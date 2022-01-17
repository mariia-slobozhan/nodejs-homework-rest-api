const path = require("path");
const fs = require("fs/promises");
const { userRep } = require("../../repository");

class LocalStorage {
  constructor(file, user) {
    this.userId = user.id;
    this.filename = file.filename;
    this.filePath = file.path;
    this.avatarFolder = process.env.AVATAR_FOLDER;
  }

  async saveFile() {
    // папка где будет физически лежать аватар
    const fileDestination = path.join('public', this.avatarFolder, this.userId);
    // создаем папку, если ее нет  
    await fs.mkdir(fileDestination, { recursive: true });
   // перенос файла из одного места в другое - из UPLOAD_DIR в public/avatars/userId/filename  
    await fs.rename(this.filePath, path.join(fileDestination, this.filename)) 
    // Создаем путь бля БД, так как физ-й путь не совпадает с путем для API 
    const staticAvatarUrl = path.normalize(path.join(this.userId, this.filename)) // userId/filename
    // Сохраняем новый путь к файлу у пользователя
      await userRep.updateAvatar(this.userId, staticAvatarUrl)
      return staticAvatarUrl;
  }
}

module.exports = LocalStorage;
