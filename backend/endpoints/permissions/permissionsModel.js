const mongoose = require("mongoose");

const permissionSchema = mongoose.Schema(
  {
    code: { type: String, required: true },
    perms: { type: Array, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Permission = mongoose.model(
  "Permission",
  permissionSchema
);
module.exports = Permission;
