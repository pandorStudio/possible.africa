const mongoose = require("mongoose");

const userRoleSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserRole = mongoose.model("UserRole", userRoleSchema);
module.exports = UserRole;