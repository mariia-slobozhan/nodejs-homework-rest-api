const Joi = require("joi");
const { Types } = require("mongoose");

const createSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool().optional(),
});

const updateSchema = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  favorite: Joi.bool().optional(),
}).or("name", "email", "phone", "favorite");

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const limitReg = /\d+/


const querySchema = Joi.object({
  limit: Joi.string().pattern(new RegExp(limitReg)).optional(),
  skip: Joi.number().min(0).optional(),
  sortBy: Joi.string()
    .valid("name", "phone", "email", "favorite", "createdAt", "updatedAt")
    .optional(),
   sortByDesc: Joi.string()
    .valid("name", "phone", "email", "favorite", "createdAt", "updatedAt")
    .optional(),
    filter: Joi.string()
    // eslint-disable-next-line prefer-regex-literals
    .pattern(new RegExp('(name|email|phone|favorite|createdAt|updatedAt)\\|?(name|email|phone|favorite|createdAt|updatedAt)+'))
    .optional(),
});

const createValidation = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({
      message: err.message.replace(/"/g, ""),
    });
  }
  next();
};

const updateValidation = async (req, res, next) => {
  try {
    await updateSchema.validateAsync(req.body);
  } catch (err) {
    const [{ type }] = err.details;
    if (type === "object.missing") {
      return res.status(400).json({ message: "Missing fields" });
    }
    return res.status(400).json({ message: err.message.replace(/"/g, "") });
  }
  next();
};

const updateFavoriteValidation = async (req, res, next) => {
  try {
    await updateFavoriteSchema.validateAsync(req.body);
  } catch (err) {
    const [{ type }] = err.details;
    if (type === "object.missing") {
      return res.status(400).json({ message: "Missing field 'favorite'" });
    }
    return res.status(400).json({ message: err.message.replace(/"/g, "") });
  }
  next();
};

const validateId = async (req, res, next) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ObjectId" });
  }
  next();
};


const validateQuery = async (req, res, next) => {
   try {
    await querySchema.validateAsync(req.query);
  } catch (err) {
    return res.status(400).json({
      message: err.message.replace(/"/g, ""),
    });
  }
  next();
};

module.exports = {
  createValidation,
  updateValidation,
  updateFavoriteValidation,
  validateId,
  validateQuery
};
