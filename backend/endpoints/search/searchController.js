const Organisation = require("../organisations/organisationModel.js");
const Post = require("../posts/postModel.js");
const Job = require("../jobs/jobModel.js");
const Event = require("../events/eventModel.js");
const Opportunity = require("../opportunities/opportunintyModel.js");
const bcrypt = require("bcryptjs");

// @Get all users
// @route GET /api/v1/users
// @access Public
exports.getAllFound = async (req, res) => {
  try {
    let q = req.query.q;
    // const results = await Organisation.find({ $text: { $search: q } });

    const results = await Promise.all([
      Organisation.find({
        $or: [
          { name: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } },
          { owner: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } },
          { email: { $regex: q, $options: "i" } },
          { telephone: { $regex: q, $options: "i" } },
          { site_web: { $regex: q, $options: "i" } },
          { linkedin_url: { $regex: q, $options: "i" } },
          { facebook_url: { $regex: q, $options: "i" } },
          { twitter_url: { $regex: q, $options: "i" } },
          { adresse: { $regex: q, $options: "i" } },
        ],
      }),
      Post.find({
        $or: [
          { title: { $regex: q, $options: "i" } },
          { slug: { $regex: q, $options: "i" } },
          { content: { $regex: q, $options: "i" } },
        ],
      }),
      Job.find({
        $or: [
          { title: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } },
          { location: { $regex: q, $options: "i" } },
          { skills: { $regex: q, $options: "i" } },
          { slug: { $regex: q, $options: "i" } },
        ],
      }),
      Event.find({
        $or: [
          { title: { $regex: q, $options: "i" } },
          { format: { $regex: q, $options: "i" } },
          { target_country: { $regex: q, $options: "i" } },
          { activity_area: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } },
          { slug: { $regex: q, $options: "i" } },
          { location: { $regex: q, $options: "i" } },
          { frequence: { $regex: q, $options: "i" } },
        ],
      }),
      Opportunity.find({
        $or: [
          { title: { $regex: q, $options: "i" } },
          { target_people: { $regex: q, $options: "i" } },
          { target_country: { $regex: q, $options: "i" } },
          { activity_area: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } },
          { eligibility: { $regex: q, $options: "i" } },
          { processus: { $regex: q, $options: "i" } },
          { slug: { $regex: q, $options: "i" } },
          { beneficies: { $regex: q, $options: "i" } },
          { registration_link: { $regex: q, $options: "i" } },
          { frequency: { $regex: q, $options: "i" } },
        ],
      }),
    ]);

    const combinedResults = [].concat(...results);

    res.status(200).json(combinedResults);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
