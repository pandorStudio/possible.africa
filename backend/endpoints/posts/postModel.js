const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    organisations: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Organisation",
    },
    categorie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PostCategorie",
    },
    country: {
      type: String,
      default: "",
    },
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String },
    image: { type: String, default: "" },
    status: {
      type: String,
      enum: ["published", "draft", "trash", "deleted", "archived"],
      default: "draft",
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// populate response with user
postSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "username firstname lastname email phone role avatar",
  });
  this.populate({
    path: "categorie",
    select: "name slug",
  });
  this.populate({
      path: "organisations",
      select: "name contributeur",
  });
  next();
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
