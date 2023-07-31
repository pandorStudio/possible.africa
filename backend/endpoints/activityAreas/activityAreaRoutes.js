const router = require("express").Router({ mergeParams: true });
const {
  getAllActivityAreas,
  getActivityAreaById,
  createActivityArea,
  updateActivityArea,
  deleteActivityArea,
} = require("./activityAreaController");

router.route("/").get(getAllActivityAreas).post(createActivityArea);

router
  .route("/:id")
  .get(getActivityAreaById)
  .put(updateActivityArea)
  .delete(deleteActivityArea);

module.exports = router;
