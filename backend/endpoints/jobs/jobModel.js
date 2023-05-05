const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    organisation: {
      type: mongoose.Schema.ObjectId,
      ref: "Organisation",
      required: [true, "A job must belong to an organisation"],
    },
    title: {
      type: String,
      required: [true, "A job must have a title"],
    },
    description: {
      type: String,
      required: [true, "A job must have a description"],
    },
    type: {
      type: String,
      enum: ["CDI", "CDD", "Stage", "Alternance", "Freelance"],
      required: [true, "A job must have a type"],
    },
    salary: {
      type: Number,
      required: [true, "A job must have a salary"],
    },
    beginning_date: {
      type: Date,
      required: [true, "A job must have a beginning date"],
    },
    ending_date: {
      type: Date,
      required: [true, "A job must have an ending date"],
    },
    location: {
      type: String,
      required: [true, "A job must have a location"],
    },
    skills: {
      type: String,
      required: [true, "A job must have skills"],
    },
  },
  {
    timestamps: true,
  }
);

// populate organisation
jobSchema.pre(/^find/, function (next) {
  this.populate({
    path: "organisation",
    select: "name type contributeur",
  });
  next();
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
