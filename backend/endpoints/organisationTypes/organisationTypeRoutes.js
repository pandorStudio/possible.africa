const router = require("express").Router({ mergeParams: true });
const {
  getAllOrganisationTypes,
  getOrganisationTypeById,
  createOrganisationType,
  updateOrganisationType,
  deleteOrganisationType,
} = require("./organisationTypeController");

router.route("/").get(getAllOrganisationTypes).post(createOrganisationType);

router
  .route("/:id")
  .get(getOrganisationTypeById)
  .put(updateOrganisationType)
  .delete(deleteOrganisationType);

module.exports = router;
