const Opportunity = require("./opportunityModel");
const CustomUtils = require("../../utils/index.js");

// @Get all opportunities
// @route GET /api/v1/opportunities
// @access Public
exports.getAllOpportunities = async (req, res, next) => {
  try {
    const opportunities = await Opportunity.find();
    res.status(200).json(opportunities);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @Get opportunity by id
// @route GET /api/v1/opportunities/:id
// @access Public
exports.getOpportunityById = async (req, res) => {
  try {
    // get opportunity by id
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity)
      return res.status(404).json({
        message: CustomUtils.consts.NOT_EXIST,
      });
    res.status(200).json(opportunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Create new opportunity
// @route POST /api/v1/opportunities
// @access Public
exports.createOpportunity = async (req, res) => {
  const CustomBody = { ...req.body };
  const slug = CustomUtils.slugify(CustomBody.title);
  try {
    CustomBody.slug = slug;
    if (req.user) CustomBody.user = req.user._id;
    // create new opportunity
    const opportunity = await Opportunity.create(CustomBody);
    res.status(201).json(opportunity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @Update opportunity by id
// @route PATCH /api/v1/opportunities/:id
// @access Public
exports.updateOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) {
      return res.status(404).json({ message: CustomUtils.consts.NOT_EXIST });
    }
    if (req.user) req.body.user = opportunity.user;
    const updated = await Opportunity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Delete opportunity by id
// @route DELETE /api/v1/opportunities/:id
// @access Public
exports.deleteOpportunity = async (req, res, next) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity)
      return res.status(404).json({ message: CustomUtils.consts.NOT_EXIST });
    await Opportunity.findByIdAndDelete(req.params.id);
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
