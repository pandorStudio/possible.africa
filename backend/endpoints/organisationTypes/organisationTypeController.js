const OrganisationType = require("./organisationTypeModel");
const CustomUtils = require("../../utils/index.js");

// @Get all organisationTypes
// @route GET /api/v1/organisationTypes
// @access Public
exports.getAllOrganisationTypes = async (req, res) => {
  try {
    const organisationTypes = await OrganisationType.find();
    res.status(200).json(organisationTypes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @Get organisationType by id
// @route GET /api/v1/organisationTypes/:id
// @access Public
exports.getOrganisationTypeById = async (req, res) => {
  try {
    // get organisationType by id
    const organisationType = await OrganisationType.findById(req.params.id);
    if (!organisationType)
      return res.status(404).json({
        message: CustomUtils.consts.NOT_EXIST,
      });
    res.status(200).json(organisationType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Create organisationType
// @route POST /api/v1/organisationTypes
// @access Public
exports.createOrganisationType = async (req, res) => {
  try {
    const organisationType = await OrganisationType.create(req.body);
    res.status(201).json(organisationType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Update organisationType
// @route PUT /api/v1/organisationTypes/:id
// @access Public
exports.updateOrganisationType = async (req, res) => {
  try {
    const organisationType = await OrganisationType.findById(req.params.id);
    if (!organisationType) {
      return res.status(404).json({ message: CustomUtils.consts.NOT_EXIST });
    }

    const updated = await OrganisationType.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Delete organisationType
// @route DELETE /api/v1/organisationTypes/:id
// @access Public
exports.deleteOrganisationType = async (req, res) => {
  try {
    const organisationType = await OrganisationType.findById(req.params.id);
    if (!organisationType)
      res.status(404).json({ message: CustomUtils.consts.NOT_EXIST });

    await OrganisationType.findByIdAndDelete(req.params.id);
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
