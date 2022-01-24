const { userRep } = require("../../repository");
const jwt = require("jsonwebtoken");
// const SECRET_KEY = process.env.JWT_SECRET_KEY

class AuthService {
  async isUserExist(email) {
    const user = await userRep.findByEmail(email);
    return !!user;
  }

  async create(body) {
    const newUser = await userRep.create(body);
    const { name, id, subscription, email, role, avatarURL, verifyTokenEmail } =
      newUser;
    return { name, id, subscription, email, role, avatarURL, verifyTokenEmail };
  }

  async getUser(email, password) {
    const user = await userRep.findByEmail(email);
    console.log(user)
    const isValidPassword = await user?.isValidPassword(password);
    if (!isValidPassword || !user?.isVerify) {
      return null;
    }
    return user;
  }

  getToken(user) {
    const { id } = user;
    const payload = { id };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "8h",
    });
    return token;
  }

  async setToken(id, token) {
    await userRep.updateToken(id, token);
  }

  async updateUserSubscription(id, body) {
    return await userRep.updateSubscription(id, body);
  }
}

module.exports = AuthService;
