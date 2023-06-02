const mongoose = require("mongoose");

const opportunityTypeSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const OpportunityType = mongoose.model(
  "OpportunityType",
  opportunityTypeSchema
);
module.exports = OpportunityType;
