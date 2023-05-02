const router = require("express").Router({ mergeParams: true });
const {
  getAllOrganisations,
  getOrganisationById,
  createOrganisation,
  updateOrganisation,
  deleteOrganisation,
} = require("./organisationController");

const API_URL_BASE = process.env.API_URL_BASE ? process.env.API_URL_BASE : "/";

router.route("/").get(getAllOrganisations).post(createOrganisation);

router

  .route("/:id")
  .get(getOrganisationById)
  .put(updateOrganisation)
  .delete(deleteOrganisation);

module.exports = router;
