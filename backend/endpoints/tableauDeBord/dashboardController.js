const CustomUtils = require("../../utils/index.js");
const Organisation = require("../organisations/organisationModel.js");
const Post = require("../posts/postModel.js");
const Job = require("../jobs/jobModel.js");
const Event = require("../events/eventModel.js");
const Opportunity = require("../opportunities/opportunityModel.js");
const User = require("../users/userModel.js");
const bcrypt = require("bcryptjs");

// @Get me
// @route GET /api/v1/users/me
// @access Private
exports.getAllTotaux = async (req, res) => {
  try {
    const organisations = await Organisation.find().count();
    const jobs = await Job.find().count();
    const opportunities = await Opportunity.find().count();
    const events = await Event.find().count();
    const posts = await Post.find().count();
    const users = await User.find().count();
    // if (!user)
    //   return res
    //     .status(404)
    //     .json({ message: `User not found !` });
    // console.log(users);
    res.status(200).json({ users, organisations, jobs, opportunities, events, posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};