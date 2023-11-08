const mongoose = require("mongoose");
const validator = require("validator");

const newslettersSuscriberSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const NewslettersSuscriber = mongoose.model(
  "NewslettersSuscriber",
  newslettersSuscriberSchema
);
module.exports = NewslettersSuscriber;
