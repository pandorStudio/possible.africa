const Event = require("./eventModel");

// @Gett all events
// @route GET /api/v1/events
// @access Public
exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @Gett all events
// @route GET /api/v1/events
// @access Public
exports.getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json(event);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @Create a event
// @route POST /api/v1/events
// @access Public
exports.createEvent = async (req, res, next) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @Update a event
// @route PATCH /api/v1/events/:id
// @access Public
exports.updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found !" });
    }
    await Event.findByIdAndUpdate(req.params.id, req.body);
    const updated = await Event.findById(req.params.id);
    return res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Delete a event
// @route DELETE /api/v1/events/:id
// @access Public
exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found !" });
    }
    await Event.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Event deleted !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
