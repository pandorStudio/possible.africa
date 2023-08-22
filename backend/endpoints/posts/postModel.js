const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    source: {
      type: String,
    },
    organisations: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Organisation",
    },
    categorie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PostCategorie",
    },
    countries: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Country",
    },
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String },
    image: { type: String, default: "" },
    status: {
      type: String,
      enum: ["published", "draft", "trash", "deleted", "archived"],
      default: "draft",
    },
    authors: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    editors: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Organisation",
    },
    publication_language: {
      type: "String",
    },
    labels: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "PostLabel",
    },
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
    select: "username firstname lastname email phone role avatar complete_name",
  });
  this.populate({
    path: "authors",
    select: "username firstname lastname email phone role avatar complete_name",
  });
  this.populate({
    path: "categorie",
    select: "name slug",
  });
  this.populate({
    path: "labels",
    select: "name slug",
  });
  this.populate({
    path: "organisations",
    select: "name contributeur logo",
  });
  this.populate({
    path: "editors",
    select: "name contributeur logo",
  });
  this.populate({
    path: "countries",
    select: "name idd flag translations",
  });
  next();
});

// populate country
// postSchema.pre("find", function (next) {
//   this.populate({
//     path: "countries",
//     select: "name idd flag translations",
//   });
//   next();
// });

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
