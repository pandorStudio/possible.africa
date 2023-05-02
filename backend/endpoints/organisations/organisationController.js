const Organisation = require("./organisationModel");
const OrganisationType = require("../organisationTypes/organisationTypeModel");

// @Get all organisations
// @route GET /api/v1/organisations
// @access Public
exports.getAllOrganisations = async (req, res) => {
  try {
    const organisations = await Organisation.find();
    res.status(200).json(organisations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @Get organisation by id
// @route GET /api/v1/organisations/:id
// @access Public
exports.getOrganisationById = async (req, res) => {
  // get organisation by id
  const organisation = await Organisation.findById(req.params.id);
  if (!organisation)
    return res
      .status(404)
      .json({ message: `Organisation with id: ${req.params.id} not found !` });
  res.status(200).json(organisation);
};

// @Create organisation
// @route POST /api/v1/organisations
// @access Public
exports.createOrganisation = async (req, res) => {
  try {
    if (req.body.name) {
      const existingName = await Organisation.findOne({
        name: req.body.name,
      });
      const existing = existingName;
      if (existing) {
        res.status(400).json({ message: "Existing organisation !" });
      } else {
        const organisation = await Organisation.create(req.body);
        res.status(201).json(organisation);
      }
    } else {
      res.status(400).json({ message: "Bad Request !" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Update organisation
// @route PUT /api/v1/organisations/:id
// @access Public
exports.updateOrganisation = async (req, res) => {
  try {
    const organisation = await Organisation.findById(req.params.id);
    if (!organisation) {
      return res.status(404).json({ message: "Organisation not found !" });
    }
    await Organisation.findByIdAndUpdate(req.params.id, req.body);
    const updatedOrganisation = await Organisation.findById(req.params.id);
    res.json(updatedOrganisation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @Delete organisation
// @route DELETE /api/v1/organisations/:id
// @access Public
exports.deleteOrganisation = async (req, res) => {
  try {
    const organisation = await Organisation.findById(req.params.id);
    if (!organisation) {
      return res.status(404).json({ message: "Organisation not found !" });
    }
    await Organisation.findByIdAndDelete(req.params.id);
    res.json({ message: "Organisation removed !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
