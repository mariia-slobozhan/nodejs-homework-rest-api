const Joi = require("joi");
const { HttpCode } = require('../../config/constants')

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(25).required(),
  subscription: Joi.string().valid("starter", "pro", "business").optional(),
  role: Joi.string().valid("administrator", "user").optional(),
});

const userValidation = async (req, res, next) => {
  try {
    await userSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(HttpCode.BAD_REQUEST).json({
      message: err.message.replace(/"/g, ""),
    });
  }
  next();
};

module.exports = {
  userValidation
};