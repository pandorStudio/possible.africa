const router = require("express").Router({ mergeParams: true });
const { signup, signin } = require("./authController.js");

router.route("/signup").post(signup);
router.route("/signin").post(signin);

module.exports = router;
