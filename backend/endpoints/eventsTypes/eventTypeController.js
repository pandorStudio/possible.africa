const EventType = require("./eventTypeModel");

// @Get all event types
// @route Get /api/v1/eventTypes
// @access Public
exports.getAllEventTypes = async (req, res) => {
  try {
    const eventTypes = await EventType.find();
    res.status(200).json(eventTypes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @Get event type by id
// @route Get /api/v1/eventTypes/:id
// @access Public
exports.getEventTypeById = async (req, res) => {
  try {
    const eventType = await EventType.findById(req.params.id);
    if (!eventType)
      return res
        .status(404)
        .json({ message: `EventType with id: ${req.params.id} not found !` });
    res.status(200).json(eventType);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @Create new event type
// @route Post /api/v1/eventTypes
// @access Public
exports.createEventType = async (req, res) => {
  try {
    const newEventType = await EventType.create(req.body);
    res.status(201).json(newEventType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @Update event type by id
// @route Patch /api/v1/eventTypes/:id
// @access Public
exports.updateEventTypeById = async (req, res) => {
  try {
    const eventType = await EventType.findById(req.params.id);
    if (!eventType)
      return res
        .status(404)
        .json({ message: `EventType with id: ${req.params.id} not found !` });
    await EventType.findByIdAndUpdate(req.params.id, req.body);
    const updated = await EventType.findById(req.params.id);
    return res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Delete event type by id
// @route Delete /api/v1/eventTypes/:id
// @access Public
exports.deleteEventTypeById = async (req, res) => {
  try {
    const eventType = await EventType.findById(req.params.id);
    if (!eventType)
      return res
        .status(404)
        .json({ message: `EventType with id: ${req.params.id} not found !` });
    await EventType.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ message: `EventType deleted successfully !` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
