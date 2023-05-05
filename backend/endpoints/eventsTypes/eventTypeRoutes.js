const router = require("express").Router({ mergeParams: true });
const {
  getAllEventTypes,
  getEventTypeById,
  createEventType,
  updateEventTypeById,
  deleteEventTypeById,
} = require("./eventTypeController");

router.route("/").get(getAllEventTypes).post(createEventType);

router
  .route("/:id")
  .get(getEventTypeById)
  .put(updateEventTypeById)
  .delete(deleteEventTypeById);

module.exports = router;
