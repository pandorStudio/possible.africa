const mongoose = require("mongoose");

const opportunitySchema = mongoose.Schema(
  {
    organisations: {
      type: [mongoose.Schema.Types.ObjectId],
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
    target_countries: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Country",
    },
    activity_areas: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "ActivityArea",
    },
    description: { type: String },
    slug: { type: String, default: "" },
    eligibility: { type: String },
    processus: { type: String },
    beneficies: { type: String },
    registration_link: { type: String },
    isRecurrent: { type: Boolean, default: false },
    frequency: { type: String },
    targets: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "OpportunityTarget",
    },
    contacts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// populate organisation
opportunitySchema.pre(/^find/, function (next) {
  this.populate({
    path: "organisations",
    select: "name type contributeur",
  });
  this.populate({
    path: "user",
    select: "username firstname lastname email phone role complete_name",
  });
  this.populate({
    path: "contacts",
    select: "username firstname lastname email phone role complete_name",
  });
  this.populate({
    path: "opportunity_type",
    select: "name slug",
  });
  this.populate({
    path: "activity_areas",
    select: "name slug",
  });
  this.populate({
    path: "targets",
    select: "name slug",
  });
  this.populate({
    path: "target_countries",
    select: "name idd flag translations",
  });
  next();
});


const Opportunity = mongoose.model("Opportunity", opportunitySchema);
module.exports = Opportunity;
