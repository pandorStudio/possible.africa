const mongoose = require("mongoose");

const opportunitySchema = mongoose.Schema(
  {
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organisation",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: { type: String },
    beginning_date: { type: Date },
    ending_date: { type: Date },
    opportunity_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OpportunityType",
    },
    target_people: {
      type: String,
      enum: [
        "project_holder",
        "startup",
        "scaleup",
        "pme-eti",
        "support_structure",
      ],
    },
    target_country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },
    activity_area: {
      type: String,
      enum: [
        "agriculture",
        "industry",
        "services",
        "commerce",
        "construction",
        "transport",
        "health",
        "education",
        "administration",
        "other",
      ],
    },
    description: { type: String },
    slug: { type: String, default: "" },
    eligibility: { type: String },
    processus: { type: String },
    beneficies: { type: String },
    registration_link: { type: String },
    isRecurrent: { type: Boolean, default: false },
    frequency: { type: String },
  },
  {
    timestamps: true,
  }
);

// populate organisation
opportunitySchema.pre(/^find/, function (next) {
  this.populate({
    path: "organisation",
    select: "name type contributeur",
  });
  this.populate({
    path: "user",
    select: "username firstname lastname email phone role complete_name",
  });
  this.populate({
    path: "opportunity_type",
    select: "name slug",
  });
  next();
});

// populate target_country
opportunitySchema.pre("find", function (next) {
  this.populate({
    path: "target_country",
    select: "name idd flag translations",
  });
  next();
});

const Opportunity = mongoose.model("Opportunity", opportunitySchema);
module.exports = Opportunity;
