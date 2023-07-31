const router = require("express").Router({ mergeParams: true });
const {
  getAllOpportunityTargets,
  getOpportunityTargetById,
  createOpportunityTarget,
  updateOpportunityTarget,
  deleteOpportunityTarget,
} = require("./opportunityTargetController");

router.route("/").get(getAllOpportunityTargets).post(createOpportunityTarget);

router
  .route("/:id")
  .get(getOpportunityTargetById)
  .put(updateOpportunityTarget)
  .delete(deleteOpportunityTarget);

module.exports = router;
