const router = require("express").Router({ mergeParams: true });

const {
  getFrenchPostFromAirtable,
  getEnglishPostFromAirtable,
  getAllPostFromAirtable,
} = require("./postController");

router.route("/fr").get(getFrenchPostFromAirtable);
router.route("/eng").get(getEnglishPostFromAirtable);
router.route("/all").get(getAllPostFromAirtable);

module.exports = router;
