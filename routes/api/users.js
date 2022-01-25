const express = require("express");
const router = express.Router();
const { users: usersController } = require("../../controllers");
const { guard, limiter, validation, upload } = require("../../midllewares");
const { userValidation } = validation;
const wrapper = require('../../midllewares/error-handler');

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

router.post("/signup", userValidation, limiter(15 * 60 * 1000, 2),  wrapper(signup));
router.post("/login", userValidation, wrapper(login));
router.post("/logout", guard, wrapper(logout));
router.get("/current", guard, wrapper(getCurrentUser));
router.patch("/", guard, wrapper(updateSubscription));
router.patch("/avatar", guard, upload.single("avatar"), wrapper(uploadAvatar));
router.get("/verify/:token", wrapper(verifyUser));
router.post("/verify/:token", wrapper(repeatEmailForVerifyUser));

module.exports = router;
