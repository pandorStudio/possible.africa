const router = require("express").Router({ mergeParams: true });
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("./eventController");

router.route("/").get(getAllEvents).post(createEvent);

router.route("/:id").get(getEventById).put(updateEvent).delete(deleteEvent);

module.exports = router;
