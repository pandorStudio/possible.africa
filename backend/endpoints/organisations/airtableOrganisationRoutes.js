const router = require("express").Router({ mergeParams: true });
const { getOrganisationsFromAirtable } = require("./organisationController.js");

router.route("/").get(getOrganisationsFromAirtable);

module.exports = router;
