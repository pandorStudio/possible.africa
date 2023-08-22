const ActivityArea = require("./activityAreaModel");
const CustomUtils = require("../../utils/index.js");

// @Get all opportunity types
// @Route: /api/v1/activityAreas
// @Access: Public
exports.getAllActivityAreas = async (req, res, next) => {
  const { limit, page, sort, fields } = req.query;
  const queryObj = CustomUtils.advancedQuery(req.query);
  try {
    const activityAreas = await ActivityArea.find(queryObj)
      .limit(limit * 1)
      .sort({ createdAt: -1, ...sort })
      .select(fields);
    res.status(200).json(activityAreas);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @Get opportunity type by id
// @Route: /api/v1/activityAreas/:id
// @Access: Public
exports.getActivityAreaById = async (req, res) => {
  try {
    // get opportunity type by id
    const activityArea = await ActivityArea.findById(req.params.id);
    if (!activityArea)
      return res.status(404).json({
        message: `activityArea with id: ${req.params.id} not found !`,
      });
    res.status(200).json(activityArea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Create new opportunity type
// @Route: /api/v1/activityAreas
// @Access: Private
exports.createActivityArea = async (req, res) => {
  const CustomBody = { ...req.body };
  const slug = CustomUtils.slugify(CustomBody.name);
  try {
    CustomBody.slug = slug;
    // create new opportunity type
    const activityArea = await ActivityArea.create(CustomBody);
    res.status(201).json(activityArea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @Update opportunity type by id
// @Route: /api/v1/activityAreas/:id
// @Access: Private
exports.updateActivityArea = async (req, res) => {
  try {
    const activityArea = await ActivityArea.findById(req.params.id);
    if (!activityArea) {
      return res.status(404).json({ message: "activityArea not found !" });
    }

    const updated = await ActivityArea.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Delete opportunity type by id
// @Route: /api/v1/activityAreas/:id
// @Access: Private
exports.deleteActivityArea = async (req, res, next) => {
  try {
    const activityArea = await ActivityArea.findById(req.params.id);
    if (!activityArea)
      return res.status(404).json({ message: `ActivityArea not found !` });
    await ActivityArea.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "activityArea deleted successfully !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
