const CustomUtils = require("../../utils/index.js");
const Organisation = require("../organisations/organisationModel.js");
const Post = require("../posts/postModel.js");
const Job = require("../jobs/jobModel.js");
const Event = require("../events/eventModel.js");
const Opportunity = require("../opportunities/opportunityModel.js");
const User = require("../users/userModel.js");
const bcrypt = require("bcryptjs");
const moment = require("moment");

const startOfYear = moment().startOf("year").toDate();
const startOfMonth = moment().startOf("month").toDate();
const startOfWeek = moment().startOf("week").toDate();
const startOfDay = moment().startOf("day").toDate();
console.log(startOfMonth);

// Calculer la date actuelle pour marquer la fin de la période de recherche
const now = new Date();
// @Get me
// @route GET /api/v1/users/me
// @access Private
exports.getAllTotaux = async (req, res) => {
  try {
    let organisations = await Organisation.find().count();
    let lastYearOrganisations = await Organisation.find({
      createdAt: {
        $gte: startOfYear,
        $lte: now,
      },
    }).count();
    let lastMonthOrganisations = await Organisation.find({
      createdAt: {
        $gte: startOfMonth,
        $lte: now,
      },
    }).count();
    let lastWeekOrganisations = await Organisation.find({
      createdAt: {
        $gte: startOfWeek,
        $lte: now,
      },
    }).count();
    let todayOrganisations = await Organisation.find({
      createdAt: {
        $gte: startOfDay,
        $lte: now,
      },
    }).count();

    // Pour les articles
    const posts = await Post.find().count();
    let lastYearPosts = await Post.find({
      createdAt: {
        $gte: startOfYear,
        $lte: now,
      },
    }).count();
    let lastMonthPosts = await Post.find({
      createdAt: {
        $gte: startOfMonth,
        $lte: now,
      },
    }).count();
    let lastWeekPosts = await Post.find({
      createdAt: {
        $gte: startOfWeek,
        $lte: now,
      },
    }).count();
    let todayPosts = await Post.find({
      createdAt: {
        $gte: startOfDay,
        $lte: now,
      },
    }).count();
    const jobs = await Job.find().count();
    const opportunities = await Opportunity.find().count();
    const events = await Event.find().count();
    const users = await User.find().count();

    // if (!user)
    //   return res
    //     .status(404)
    //     .json({ message: `User not found !` });
    // console.log(users);
    res.status(200).json({
      users,
      organisations: {
        all: organisations,
        year: {
          evolution: Math.round((lastYearOrganisations / organisations) * 100),
          length: lastYearOrganisations,
        },
        month: {
          evolution: Math.round((lastMonthOrganisations / organisations) * 100),
          length: lastMonthOrganisations,
        },
        week: {
          evolution: Math.round((lastWeekOrganisations / organisations) * 100),
          length: lastWeekOrganisations,
        },
        day: {
          evolution: Math.round((todayOrganisations / organisations) * 100),
          length: todayOrganisations,
        },
      },
      posts: {
        all: posts,
        year: {
          evolution: Math.round((lastYearPosts / posts) * 100),
          length: lastYearPosts,
        },
        month: {
          evolution: Math.round((lastMonthPosts / posts) * 100),
          length: lastMonthPosts,
        },
        week: {
          evolution: Math.round((lastWeekPosts / posts) * 100),
          length: lastWeekPosts,
        },
        day: {
          evolution: Math.round((todayPosts / posts) * 100),
          length: todayPosts,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
