const express = require("express");
const router = express.Router();
const { users: usersController } = require("../../controllers");
const { guard, limiter, validation, upload } = require("../../midllewares");
const { userValidation } = validation;

const {
  signup,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  uploadAvatar,
  verifyUser,
  repeatEmailForVerifyUser
} = usersController;

router.post("/signup", userValidation, limiter(15 * 60 * 1000, 2), signup);
router.post("/login", userValidation, login);
router.post("/logout", guard, logout);
router.get("/current", guard, getCurrentUser);
router.patch("/", guard, updateSubscription);
router.patch("/avatar", guard, upload.single("avatar"), uploadAvatar);
router.get("/verify/:token", verifyUser);
router.post("/verify/:token", repeatEmailForVerifyUser);

module.exports = router;
