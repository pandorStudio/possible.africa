const OpportunityTarget = require("./opportunityTargetModel.js");
const CustomUtils = require("../../utils/index.js");

// @Get all opportunity types
// @Route: /api/v1/opportunity_targets
// @Access: Public
exports.getAllOpportunityTargets = async (req, res, next) => {
  try {
    const opportunityTargets = await OpportunityTarget.find().sort({
      createdAt: -1,
    });
    res.status(200).json(opportunityTargets);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @Get opportunity type by id
// @Route: /api/v1/opportunity_targets/:id
// @Access: Public
exports.getOpportunityTargetById = async (req, res) => {
  try {
    // get opportunity type by id
    const opportunityTarget = await OpportunityTarget.findById(req.params.id);
    if (!opportunityTarget)
      return res.status(404).json({
        message: CustomUtils.consts.NOT_FOUND,
      });
    res.status(200).json(opportunityTarget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Create new opportunity type
// @Route: /api/v1/opportunity_targets
// @Access: Private
exports.createOpportunityTarget = async (req, res) => {
  const CustomBody = { ...req.body };
  const slug = CustomUtils.slugify(CustomBody.name);
  try {
    CustomBody.slug = slug;
    // create new opportunity type
    const opportunityTarget = await OpportunityTarget.create(CustomBody);
    res.status(201).json(opportunityTarget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @Update opportunity type by id
// @Route: /api/v1/opportunity_targets/:id
// @Access: Private
exports.updateOpportunityTarget = async (req, res) => {
  try {
    const opportunityTarget = await OpportunityTarget.findById(req.params.id);
    if (!opportunityTarget) {
      return res.status(404).json({ message: "opportunityTarget not found !" });
    }

    const updated = await OpportunityTarget.findByIdAndUpdate(
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
// @Route: /api/v1/opportunity_targets/:id
// @Access: Private
exports.deleteOpportunityTarget = async (req, res, next) => {
  try {
    const opportunityTarget = await OpportunityTarget.findById(req.params.id);
    if (!opportunityTarget)
      return res.status(404).json({ message: `opportunityTarget not found !` });
    await OpportunityTarget.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "opportunityTarget deleted successfully !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
