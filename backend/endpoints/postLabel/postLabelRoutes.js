const router = require("express").Router({ mergeParams: true });

const {
  getAllPostLabels,
  getPostLabelById,
  createPostLabel,
  updatePostLabel,
  deletePostLabel,
} = require("./postLabelController.js");

router.route("/").get(getAllPostLabels).post(createPostLabel);

router
  .route("/:id")
  .get(getPostLabelById)
  .put(updatePostLabel)
  .delete(deletePostLabel);

module.exports = router;
