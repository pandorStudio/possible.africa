const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./db");
const bcrypt = require("bcrypt");
const User = require("./endpoints/users/userModel");
// import dotenv
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_URL_BASE = process.env.API_URL_BASE ? process.env.API_URL_BASE : "/";
const URL_CONNECT_DEV = process.env.URL_CONNECT_DEV;
const userRoutes = require("./endpoints/users/usersRoute");

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(API_URL_BASE, userRoutes);

// Routes
app.get(API_URL_BASE, (req, res) => {
  res.json({ message: "Welcome to the API!" });
});

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

connection(URL_CONNECT_DEV);

// export app
module.exports.API_URL_BASE = API_URL_BASE;
