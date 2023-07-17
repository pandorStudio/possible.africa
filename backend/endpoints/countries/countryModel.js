const mongoose = require("mongoose");

const countrySchema = mongoose.Schema(
  {
    name: {
      type: {
        common: { type: String },
        official: { type: String },
        nativeName: { type: Object },
      },
    },
    idd: { type: Object },
    flag: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Country = mongoose.model("Country", countrySchema);
module.exports = Country;
