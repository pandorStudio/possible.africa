const router = require("express").Router({ mergeParams: true });

const {
  getAllNewslettersSuscribers,
  getNewslettersSuscriberById,
  createNewslettersSuscriber,
  updateNewslettersSuscriber,
  deleteNewslettersSuscriber,
} = require("./newsletterSuscriberController.js");

router
  .route("/")
  .get(getAllNewslettersSuscribers)
  .post(createNewslettersSuscriber);

router
  .route("/:id")
  .get(getNewslettersSuscriberById)
  .put(updateNewslettersSuscriber)
  .delete(deleteNewslettersSuscriber);

module.exports = router;
