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
    beginningDate: { type: Date, required: true },
    endingDate: { type: Date, required: true },
    event_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EventType",
    },
    format: {
      type: String,
      enum: ["online", "hybrid", "physical"],
    },
    target_countriy: {
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
    description: { type: String, required: true },
    registration_link: { type: String, required: true },
    location: {
      type: String,
    },
    is_recurrent: { type: Boolean, required: true, default: false },
    frequence: String,
  },
  {
    timestamps: true,
  }
);

// populate the event with the organisation name and type
eventSchema.pre("find", function (next) {
  this.populate({
    path: "organisation",
    select: "name type",
  });
  next();
});

// populate the event with the contributeur username, firstname, lastname, email, phone and role
eventSchema.pre("find", function (next) {
  this.populate({
    path: "user",
    select: "username firstname lastname email phone role",
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
