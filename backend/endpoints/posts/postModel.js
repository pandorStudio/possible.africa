const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    categorie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PostCategorie",
    },
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    image: { type: String, default: "https://picsum.photos/200/300" },
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
    select: "username firstname lastname email phone role",
  });
  this.populate({
    path: "categorie",
    select: "name slug",
  });
  next();
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
