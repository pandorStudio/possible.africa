const router = require("express").Router({ mergeParams: true });

const {
  getAllPostCategories,
  getPostCategorieById,
  createPostCategorie,
  updatePostCategorie,
  deletePostCategorie,
} = require("./postCategorieController.js");

router.route("/").get(getAllPostCategories).post(createPostCategorie);

router
  .route("/:id")
  .get(getPostCategorieById)
  .put(updatePostCategorie)
  .delete(deletePostCategorie);

module.exports = router;
