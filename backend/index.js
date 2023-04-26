const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./db");
// import dotenv
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const APP_URL_BASE = process.env.APP_URL_BASE ? process.env.APP_URL_BASE : "/";
const URL_CONNECT_DEV = process.env.URL_CONNECT_DEV;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get(APP_URL_BASE, (req, res) => {
  res.json({ message: "Welcome to the API!" });
});

// generate all other user endpoints
app.get(APP_URL_BASE + "users", (req, res) => {
  res.json({ message: "Get all users" });
});

app.get(APP_URL_BASE + "users/:id", (req, res) => {
  res.json({ message: "Get user by id" });
});

app.post(APP_URL_BASE + "users", (req, res) => {
  res.json({ message: "Create user" });
});

app.put(APP_URL_BASE + "users/:id", (req, res) => {
  res.json({ message: "Update user" });
});

app.delete(APP_URL_BASE + "users/:id", (req, res) => {
  res.json({ message: "Delete user" });
});

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

connection(URL_CONNECT_DEV);

// export app
module.exports = app;
