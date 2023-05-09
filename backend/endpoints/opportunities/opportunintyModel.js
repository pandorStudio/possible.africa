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
    title: { type: String, required: true },
    beginning_date: { type: Date, required: true },
    ending_date: { type: Date, required: true },
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
      type: String,
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
opportunitySchema.pre("find", function (next) {
  this.populate({
    path: "organisation",
    select: "name type contributeur",
  });
  next();
});

// populate contributeur
opportunitySchema.pre("find", function (next) {
  this.populate({
    path: "user",
    select: "username firstname lastname email phone role",
  });
  next();
});

// populate type
opportunitySchema.pre("find", function (next) {
  this.populate({
    path: "opportunity_type",
    select: "name slug",
  });
  next();
});

const Opportunity = mongoose.model("Opportunity", opportunitySchema);
module.exports = Opportunity;
