const mongoose = require("mongoose");

const postLabel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const PostLabel = mongoose.model("PostLabel", postLabel);
module.exports = PostLabel;