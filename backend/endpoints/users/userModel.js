const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    description: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "contributor", "editor", "user"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["m", "f", "o"],
      required: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    address: {
      type: String,
    },
    facebook_profile: {
      type: String,
    },
    twitter_profile: {
      type: String,
    },
    linkedin_profile: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
