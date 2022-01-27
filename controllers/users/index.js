const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const getCurrentUser = require('./current');
const updateSubscription = require('./updateSubscription');
const uploadAvatar = require('./uploadAvatar');
const verifyUser = require('./verifyUser');
const repeatEmailForVerifyUser = require('./repeatEmailForVarifyUser');


module.exports = {
  signup,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  uploadAvatar,
  verifyUser,
  repeatEmailForVerifyUser
};
