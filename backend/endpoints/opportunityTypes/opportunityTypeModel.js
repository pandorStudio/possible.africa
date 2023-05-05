const mongoose = require("mongoose");

const opportunityTypeSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
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
