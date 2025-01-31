const findById = require("./findById");
const findByEmail = require("./findByEmail");
const create = require("./create");
const updateToken = require("./updateToken");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const findByVerifyToken = require("./findByVerifyToken");
const updateVerify = require('./updateVerify')

module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
  updateSubscription,
  updateAvatar,
  findByVerifyToken,
  updateVerify
};
