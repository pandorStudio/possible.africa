const router = require("express").Router({ mergeParams: true });
const {
  getAllOrganisations,
  getOrganisationById,
  createOrganisation,
  updateOrganisation,
  deleteOrganisation,
} = require("./organisationController");
const { UploadImage } = require("../uploads/uploadsController.js");

router
  .route("/")
  .get(getAllOrganisations)
  .post(UploadImage.single("logo"), createOrganisation);

router
  .route("/:id")
  .get(getOrganisationById)
  .put(updateOrganisation)
  .delete(deleteOrganisation);

module.exports = router;
