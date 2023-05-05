const router = require("express").Router({ mergeParams: true });
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} = require("./jobController");

router.route("/").get(getAllJobs).post(createJob);

router.route("/:id").get(getJobById).put(updateJob).delete(deleteJob);

module.exports = router;
