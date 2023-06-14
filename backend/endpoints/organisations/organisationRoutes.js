const router = require("express").Router({ mergeParams: true });
const {
  getAllOrganisations,
  getOrganisationById,
  createOrganisation,
  updateOrganisation,
  deleteOrganisation,
  getWpImageBuffer,
} = require("./organisationController");
const { UploadImage } = require("../uploads/uploadsController.js");

router.route("/getBuff").post(getWpImageBuffer);

router
  .route("/")
  .get(getAllOrganisations)
  .post(createOrganisation);

router
  .route("/:id")
  .get(getOrganisationById)
  .put(updateOrganisation)
  .delete(deleteOrganisation);

module.exports = router;
