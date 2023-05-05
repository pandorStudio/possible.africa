const router = require("express").Router({ mergeParams: true });
const {
  getAllOpportunityTypes,
  getOpportunityTypeById,
  createOpportunityType,
  updateOpportunityType,
  deleteOpportunityType,
} = require("./opportunityTypeController");

router.route("/").get(getAllOpportunityTypes).post(createOpportunityType);

router
  .route("/:id")
  .get(getOpportunityTypeById)
  .put(updateOpportunityType)
  .delete(deleteOpportunityType);

module.exports = router;
