const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    organisation: {
      type: mongoose.Schema.ObjectId,
      ref: "Organisation",
    },
    title: {
      type: String,
      required: [true, "A job must have a title"],
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: ["CDI", "CDD", "Stage", "Alternance", "Freelance"],
    },
    salary: {
      type: Number,
    },
    beginning_date: {
      type: Date,
    },
    ending_date: {
      type: Date,
    },
    location: {
      type: String,
    },
    skills: {
      type: String,
    },
    slug: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

// populate organisation
jobSchema.pre(/^find/, function (next) {
  this.populate({
    path: "organisation",
    select: "name type contributeur logo",
  });
  next();
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
