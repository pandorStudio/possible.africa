const router = require("express").Router({ mergeParams: true });
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("./usersController");
const { protect, restrictTo } = require("../auth/authController.js");

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
