const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./db");
const bcrypt = require("bcrypt");
const User = require("./models/userModel");
// import dotenv
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_URL_BASE = process.env.API_URL_BASE ? process.env.API_URL_BASE : "/";
const URL_CONNECT_DEV = process.env.URL_CONNECT_DEV;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get(API_URL_BASE, (req, res) => {
  res.json({ message: "Welcome to the API!" });
});

// generate all other user endpoints
app.get(API_URL_BASE + "users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.get(API_URL_BASE + "users/:id", (req, res) => {
  res.json({ message: "Get user by id" });
});

app.post(API_URL_BASE + "users", async (req, res) => {
  try {
    if (req.body.username) {
      const existingUsername = await User.findOne({ username: req.body.username });
      const existingEmail = await User.findOne({ email: req.body.email });
      const existingPhone = await User.findOne({ phone: req.body.phone });
      const existing = existingUsername || existingEmail || existingPhone;
      if (existing) {
        res
          .status(400)
          .json({ message: "Existing user !" });
      } else {
        // Hash password with bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        const user = await User.create(req.body);
        res.status(201).json(user);
      }
    } else {
      res.status(400).json({ message: "Bad Request !" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put(API_URL_BASE + "users/:id", (req, res) => {
  res.json({ message: "Update user" });
});

app.delete(API_URL_BASE + "users/:id", (req, res) => {
  res.json({ message: "Delete user" });
});

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

connection(URL_CONNECT_DEV);

// export app
module.exports = app;
