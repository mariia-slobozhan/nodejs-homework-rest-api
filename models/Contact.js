const { Schema, SchemaTypes, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
      required: true,

    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true, transform: function (doc, ret) {
        delete ret._id
        return ret
    } },
    toObject: { virtuals: true },
  }
);

const Contact = model("contact", contactSchema);

module.exports = Contact;
