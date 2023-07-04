const router = require("express").Router({ mergeParams: true });
const { getAllTotaux } = require("./dashboardController");
const { protect, restrictTo } = require("../auth/authController.js");

router.route("/").get(getAllTotaux);

module.exports = router;
