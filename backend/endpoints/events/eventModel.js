const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
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
    cover: { type: String, default: "" },
    beginingDate: { type: Date },
    endingDate: { type: Date },
    event_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EventType",
    },
    format: {
      type: String,
      default: "",
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
  },
  {
    timestamps: true,
  }
);

// populate the event with the organisation name and type
eventSchema.pre("find", function (next) {
  this.populate({
    path: "organisation",
    select: "name type logo",
  });
  next();
});

// populate the event with the contributeur username, firstname, lastname, email, phone and role
eventSchema.pre("find", function (next) {
  this.populate({
    path: "user",
    select: "username firstname lastname email phone role avatar",
  });
  next();
});

// populate the event with the event type name and slug
eventSchema.pre("find", function (next) {
  this.populate({
    path: "event_type",
    select: "name slug",
  });
  next();
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
