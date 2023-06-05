const Organisation = require("../organisations/organisationModel.js");
const bcrypt = require("bcryptjs");

// @Get all users
// @route GET /api/v1/users
// @access Public
exports.getAllFound = async (req, res) => {
  try {
    let q = req.query.q;

    // console.log(q);

    // { owner: { $regex: q, $options: "i" } },
    // { description: { $regex: q, $options: "i" } },
    // { email: { $regex: q, $options: "i" } },
    // { telephone: { $regex: q, $options: "i" } },
    // { site_web: { $regex: q, $options: "i" } },
    // { linkedin_url: { $regex: q, $options: "i" } },
    // { facebook_url: { $regex: q, $options: "i" } },
    // { twitter_url: { $regex: q, $options: "i" } },
    // { adresse: { $regex: q, $options: "i" } }

    const results = await Organisation.find({
      $or: [
        {name: { $regex: q, $options: "i" }},
        {description: { $regex: q, $options: "i" }},
      ],
    });

    res.status(200).json(results);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
