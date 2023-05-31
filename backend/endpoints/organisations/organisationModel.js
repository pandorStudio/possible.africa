const mongoose = require("mongoose");

const organisationSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },

    avatar: {
      type: String,
      default: "https://i.pravatar.cc/300",
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrganisationType",
    },
    contributeur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    owner: {
      type: String,
      default: "Inconnu",
    },
    description: { type: String },
    email: { type: String },
    telephone: { type: String },
    site_web: { type: String },
    linkedin_url: { type: String },
    facebook_url: { type: String },
    twitter_url: { type: String },
    adresse: { type: String },
  },
  {
    timestamps: true,
  }
);

// Constraind contributeur to be a contributor
/*organisationSchema.path("contributeur").validate(async (value) => {
  const user = await mongoose.model("User").findById(value);
  return user.role === "contributor";
}, "Contributeur must be a contributor");*/

// Run validators on update
organisationSchema.pre("findOneAndUpdate", async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  if (docToUpdate.contributeur !== this.getUpdate().contributeur) {
    const user = await mongoose
      .model("User")
      .findById(this.getUpdate().contributeur);
    if (user.role !== "contributor") {
      next(new Error("Contributeur must be a contributor"));
    }
  }
  next();
});

// populate response with organisationType
organisationSchema.pre(/^find/, function (next) {
  this.populate({
    path: "type",
    select: "name slug",
  });
  this.populate({
    path: "contributeur",
    select: "username firstname lastname email phone role",
  });
  next();
});

const Organisation = mongoose.model("Organisation", organisationSchema);
module.exports = Organisation;
