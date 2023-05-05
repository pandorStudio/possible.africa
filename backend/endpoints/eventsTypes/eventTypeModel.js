const mongoose = require("mongoose");

const eventTypeSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const EventType = mongoose.model("EventType", eventTypeSchema);
module.exports = EventType;
