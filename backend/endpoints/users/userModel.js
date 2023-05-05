const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
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
      required: true,
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
      required: true,
    },
    phone: {
      type: String,
      unique: true,
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
  this.password = hashPassword(this.password);

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
