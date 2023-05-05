const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organisation",
      required: true,
    },
    contributeurs: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    beginningDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EventType",
      required: true,
    },
    format: {
      type: String,
      enum: ["online", "hybrid", "physical"],
      required: true,
    },
    target_countriy: {
      type: String,
      required: true,
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
      required: true,
    },
    description: { type: String, required: true },
    registration_link: { type: String, required: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        Default: "Point",
        required: true,
      },
      coordinates: [Number],
      address: String,
      description: String,
      day: Number,
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
    path: "organisateur",
    select: "name type",
  });
  next();
});

// populate the event with the contributeur username, firstname, lastname, email, phone and role
eventSchema.pre("find", function (next) {
  this.populate({
    path: "contributeurs",
    select: "username firstname lastname email phone role",
  });
  next();
});

// populate the event with the event type name and slug
eventSchema.pre("find", function (next) {
  this.populate({
    path: "type",
    select: "name slug",
  });
  next();
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
