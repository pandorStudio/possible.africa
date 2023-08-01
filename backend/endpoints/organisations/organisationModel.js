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
    types: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "OrganisationType",
      createIndexes: true,
    },
    contributeur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },
    covered_countries: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Country",
    },
    slug: {
      type: String,
      default: "",
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
    activity_areas: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "ActivityArea",
    },
    contacts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    creation_year: {
      type: String, 
    }
  },
  {
    timestamps: true,
  }
);

organisationSchema.index({
  name: "text",
  country: "text",
  slug: "text",
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
    path: "types",
    select: "name slug",
  });
  this.populate({
    path: "covered_countries",
    select: "name idd flag translations",
  });
  this.populate({
    path: "contributeur",
    select: "username firstname lastname email phone role avatar complete_name",
  });
  this.populate({
    path: "contacts",
    select: "username firstname lastname email phone role avatar complete_name",
  });
  this.populate({
    path: "activity_areas",
    select: "name slug",
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
