const router = require("express").Router({ mergeParams: true });

const {
  getAllCountries,
  createCountry,
  getCountryById,
} = require("./countryController.js");

router.route("/").get(getAllCountries).post(createCountry);

router
  .route("/:id")
  .get(getCountryById);
  // .put(updateUserRole)
  // .delete(deleteUserRole);

module.exports = router;
