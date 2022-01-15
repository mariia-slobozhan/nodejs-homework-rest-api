const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const { Role } = require("../config/constants");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Set email for user"],
      unique: true,
      validate(value) {
        const regul = /\S+@\S+\.\S+/;
        return regul.test(String(value).trim().toLowerCase());
      },
    },
    password: {  // or hash
      type: String,
      required: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    role: {
      type: String,
      enum: {
        values: Object.values(Role),
        message: "Role is not allowed",
      },
      default: Role.USER,
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  // перед сохранением в базу методом save
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(6); // change encryption algorithm
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);

module.exports = User;
