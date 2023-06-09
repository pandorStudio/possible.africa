const mongoose = require("mongoose");

const postCategorieSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const PostCategorie = mongoose.model("PostCategorie", postCategorieSchema);
module.exports = PostCategorie;
