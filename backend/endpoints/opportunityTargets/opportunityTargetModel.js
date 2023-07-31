const mongoose = require("mongoose");

const opportunityTargetSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const OpportunityTarget = mongoose.model(
  "OpportunityTarget",
  opportunityTargetSchema
);
module.exports = OpportunityTarget;
