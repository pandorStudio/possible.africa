const mongoose = require("mongoose");

const organisationSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    logo: {
      type: String,
      default: "",
    },
    couverture: {
      type: String,
      default: "",
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrganisationType",
    },
    contributeur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },
    slug: {
      type: String,
      default: "",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: { type: String },
    email: { type: String },
    telephone: {
      type: {
        indicatif: { type: String },
        number: { type: String },
      },
    },
    site_web: { type: String },
    linkedin_url: { type: String },
    facebook_url: { type: String },
    twitter_url: { type: String },
    adresse: { type: String },
  },
  {
    timestamps: true,
  }
);

organisationSchema.index({
  name: "text",
  country: "text",
  slug: "text",
  owner: "text",
  description: "text",
  email: "text",
  telephone: "text",
  site_web: "text",
  linkedin_url: "text",
  facebook_url: "text",
  twitter_url: "text",
  adresse: "text",
});

// populate response with organisationType
organisationSchema.pre(/^find/, function (next) {
  this.populate({
    path: "type",
    select: "name slug",
  });
  this.populate({
    path: "owner",
    select: "username firstname lastname email phone role avatar",
  });
  next();
});

organisationSchema.pre("find", function (next) {
  this.populate({
    path: "country",
    select: "name idd flag translations",
  });
  next();
});

const Organisation = mongoose.model("Organisation", organisationSchema);
module.exports = Organisation;
