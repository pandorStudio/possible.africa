const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    avatar: {
      type: String,
      default: "https://i.pravatar.cc/300",
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: true,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    description: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "contributor", "editor", "user"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["m", "f", "o"],
      default: "o",
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    facebook_profile: {
      type: String,
    },
    twitter_profile: {
      type: String,
    },
    linkedin_profile: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password universal function
async function hashPassword(password) {
  return await bcrypt.hash(password, 12);
}

// Hash password and delete confirmPassword before saving
userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash password with cost of 12
  this.password = await hashPassword(this.password);

  // Delete confirmPassword field
  this.confirmPassword = undefined;
  next();
});

// Hash password and delete confirmPassword before updating or create
userSchema.pre("findOneAndUpdate", async function (next) {
  // Only run this function if password was actually modified
  if (!this._update.password) return next();

  // Hash password with cost of 12
  this._update.password = await hashPassword(this._update.password);

  // Delete confirmPassword field
  this._update.confirmPassword = undefined;
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  console.log("pass is: ", candidatePassword);
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
