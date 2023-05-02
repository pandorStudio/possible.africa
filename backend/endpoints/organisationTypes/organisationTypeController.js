const OrganisationType = require('./organisationTypeModel');

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
    // get organisationType by id
    const organisationType = await OrganisationType.findById(req.params.id);
    if (!organisationType)
        return res
        .status(404)
        .json({ message: `OrganisationType with id: ${req.params.id} not found !` });
    res.status(200).json(organisationType);
}
    
// @Create organisationType
// @route POST /api/v1/organisationTypes
// @access Public
exports.createOrganisationType = async (req, res) => {
    try {
        if (req.body.name) {
            const existingName = await OrganisationType.findOne({
                name: req.body.name,
            });
            const existing = existingName;
            if (existing) {
                res.status(400).json({ message: "Existing organisationType !" });
            } else {
                const organisationType = await OrganisationType.create(req.body);
                res.status(201).json(organisationType);
            }
        } else {
            res.status(400).json({ message: "Bad Request !" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @Update organisationType
// @route PUT /api/v1/organisationTypes/:id
// @access Public
exports.updateOrganisationType = async (req, res) => {
    try {
        const organisationType = await OrganisationType.findById(req.params.id);
        if (!organisationType) { 
            return res.status(404).json({ message: "OrganisationType not found !" });
        }
        
        await OrganisationType.findByIdAndUpdate(req.params.id, req.body);
        const updated = await OrganisationType.findById(req.params.id);
        return res.status(200).json(updated);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @Delete organisationType
// @route DELETE /api/v1/organisationTypes/:id
// @access Public
exports.deleteOrganisationType = async (req, res) => {
    try {
        const organisationType = await OrganisationType.findById(req.params.id);
        if (organisationType) {
            await OrganisationType.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "OrganisationType removed !" });
        } else {
            res.status(404).json({ message: "OrganisationType not found !" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}