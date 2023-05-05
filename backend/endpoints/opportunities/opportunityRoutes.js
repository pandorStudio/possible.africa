const router = require("express").Router({ mergeParams: true });

const {
  getAllOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
} = require("./opportunityController");

router.route("/").get(getAllOpportunities).post(createOpportunity);

router
  .route("/:id")
  .get(getOpportunityById)
  .put(updateOpportunity)
  .delete(deleteOpportunity);

module.exports = router;
