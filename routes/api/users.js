const express = require("express");
const router = express.Router();
const { users: usersController } = require("../../controllers");
const guard = require("../../midllewares/guard");
const limiter = require("../../midllewares/rate-limit");
const {
  userValidation,
} = require("../../midllewares/validation/userValidation");

const { signup, login, logout, getCurrentUser, updateSubscription } = usersController;

router.post("/signup", userValidation, limiter(15 * 60 * 1000, 2),  signup);
router.post("/login", userValidation, login);
router.post("/logout", guard, logout);
router.get("/current", guard, getCurrentUser);
router.patch("/", guard, updateSubscription);

module.exports = router;
