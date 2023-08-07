const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    organisations: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Organisation",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: { type: String, required: true },
    cover: { type: String, default: "" },
    beginningDate: { type: Date },
    endingDate: { type: Date },
    event_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EventType",
    },
    format: {
      type: String,
      default: "",
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
    slug: {
      type: String,
      default: "",
    },
    registration_link: { type: String },
    location: {
      type: String,
    },
    is_recurrent: { type: Boolean, default: false },
    frequence: {
      type: String,
    },
    status: {
      type: String,
      enum: ["published", "draft", "deleted", "archived"],
      default: "draft",
    },
    contacts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    source: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

eventSchema.pre(/^find/, function (next) {
  this.populate({
    path: "organisations",
    select: "name type logo",
  });
  this.populate({
    path: "user",
    select: "username firstname lastname email phone role avatar complete_name",
  });
  this.populate({
    path: "contacts",
    select: "username firstname lastname email phone role avatar complete_name",
  });
  this.populate({
    path: "event_type",
    select: "name slug",
  });

  this.populate({
    path: "target_countries",
    select: "name idd flag translations",
  });
  this.populate({
    path: "activity_areas",
    select: "name slug",
  });
  next();
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
