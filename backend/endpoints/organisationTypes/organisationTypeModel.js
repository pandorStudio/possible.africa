const mongoose = require("mongoose");

const organisationTypeSchema = mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        slug: { type: String, required: true, unique: true },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const OrganisationType = mongoose.model("OrganisationType", organisationTypeSchema);
module.exports = OrganisationType;