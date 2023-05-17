const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./db");
// import dotenv
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_URL_BASE = process.env.API_URL_BASE ? process.env.API_URL_BASE : "/";
const URL_CONNECT_DEV = process.env.URL_CONNECT_DEV;
const userRoutes = require("./endpoints/users/userRoutes");
const organisationTypeRoutes = require("./endpoints/organisationTypes/organisationTypeRoutes");
const organisationRoutes = require("./endpoints/organisations/organisationRoutes");
const authRoutes = require("./endpoints/auth/authRouter");
const jobRoutes = require("./endpoints/jobs/jobRoutes");
const opportunityTypeRoutes = require("./endpoints/opportunityTypes/opportunityTypeRoutes");
const opportunityRoutes = require("./endpoints/opportunities/opportunityRoutes");
const eventTypeRoutes = require("./endpoints/eventsTypes/eventTypeRoutes");
const eventRoutes = require("./endpoints/events/eventRoutes");

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(API_URL_BASE + "users", userRoutes);
app.use(API_URL_BASE + "organisation_types", organisationTypeRoutes);
app.use(API_URL_BASE + "organisations", organisationRoutes);
app.use(API_URL_BASE, authRoutes);
app.use(API_URL_BASE + "jobs", jobRoutes);
app.use(API_URL_BASE + "opportunity_types", opportunityTypeRoutes);
app.use(API_URL_BASE + "opportunities", opportunityRoutes);
app.use(API_URL_BASE + "event_types", eventTypeRoutes);
app.use(API_URL_BASE + "events", eventRoutes);

// Routes
app.get(API_URL_BASE, (req, res) => {
  res.json({ message: "Welcome to the API!" });
});

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// connection(URL_CONNECT_DEV);
connection("mongodb://localhost:27017");

// export app
module.exports.API_URL_BASE = API_URL_BASE;
