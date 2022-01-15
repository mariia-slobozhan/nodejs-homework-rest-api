const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const getCurrentUser = require('./current');
const updateSubscription = require('./updateSubscription');

module.exports = {
  signup,
  login,
  logout,
  getCurrentUser,
  updateSubscription
};
