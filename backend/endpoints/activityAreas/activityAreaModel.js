const mongoose = require("mongoose");

const activityAreaSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ActivityArea = mongoose.model("ActivityArea", activityAreaSchema);
module.exports = ActivityArea;
