const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./db");
const multer = require("multer");
// import dotenv
require("dotenv").config();

// Configurer le stockage des fichiers
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, `${__dirname}/uploads/`);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });

// Initialiser l'upload de Multer


const app = express();
const PORT = process.env.PORT || 4534;
const API_URL_BASE = process.env.API_URL_BASE ? process.env.API_URL_BASE : "/";
const URL_CONNECT_DEV = process.env.URL_CONNECT;
const userRoutes = require("./endpoints/users/userRoutes");
const profilRoutes = require("./endpoints/profil/profilRoutes");
const userRolesRoutes = require("./endpoints/userRoles/userRoleRoutes");
const organisationTypeRoutes = require("./endpoints/organisationTypes/organisationTypeRoutes");
const organisationRoutes = require("./endpoints/organisations/organisationRoutes");
const authRoutes = require("./endpoints/auth/authRouter");
const jobRoutes = require("./endpoints/jobs/jobRoutes");
const opportunityTypeRoutes = require("./endpoints/opportunityTypes/opportunityTypeRoutes");
const opportunityRoutes = require("./endpoints/opportunities/opportunityRoutes");
const eventTypeRoutes = require("./endpoints/eventsTypes/eventTypeRoutes");
const eventRoutes = require("./endpoints/events/eventRoutes");
const postCategorieRoutes = require("./endpoints/postCategories/postCategorieRoutes");
const postRoutes = require("./endpoints/posts/postRouter");
const uploadRoutes = require("./endpoints/uploads/uploadRoutes");
const searchRoutes = require("./endpoints/search/searchRoutes");

// Middleware
//
const {protect} = require("./endpoints/auth/authController.js");
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// allow static files
app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json());

//protections
app.use(API_URL_BASE, authRoutes);
app.use(protect)
app.use(API_URL_BASE + "users", userRoutes);
app.use(API_URL_BASE + "profil", profilRoutes);
app.use(API_URL_BASE + "user_roles", userRolesRoutes);
app.use(API_URL_BASE + "organisation_types", organisationTypeRoutes);
app.use(API_URL_BASE + "organisations", organisationRoutes);
app.use(API_URL_BASE + "jobs", jobRoutes);
app.use(API_URL_BASE + "opportunity_types", opportunityTypeRoutes);
app.use(API_URL_BASE + "opportunities", opportunityRoutes);
app.use(API_URL_BASE + "event_types", eventTypeRoutes);
app.use(API_URL_BASE + "events", eventRoutes);
app.use(API_URL_BASE + "post_categories", postCategorieRoutes);
app.use(API_URL_BASE + "posts", postRoutes);
app.use(API_URL_BASE + "upload", uploadRoutes);
app.use(API_URL_BASE + "search", searchRoutes);

// Routes
app.get(API_URL_BASE, (req, res) => {
  res.json({ message: "Welcome to the API! This is the official API of Possible.Africa" });
});


// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
connection(URL_CONNECT_DEV);
