const Job = require("./jobModel.js");
const CustomUtils = require("../../utils/index.js");

// GET ALL JOBS
exports.getAllJobs = async (req, res, next) => {
  const { limit, page, sort, fields } = req.query;
  const queryObj = CustomUtils.advancedQuery(req.query);
  try {
    const jobs = await Job.find(queryObj)
      .limit(limit * 1)
      .sort({ createdAt: -1, ...sort })
      .select(fields);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// GET JOB BY ID
exports.getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job)
      return res.status(404).json({
        message: CustomUtils.consts.NOT_EXIST,
      });
    res.status(200).json(job);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// CREATE JOB
exports.createJob = async (req, res, next) => {
  const CustomBody = { ...req.body };
  const slug = CustomUtils.slugify(CustomBody.title);
  try {
    CustomBody.slug = slug;
    const newJob = await Job.create(CustomBody);
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE JOB
exports.updateJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job)
      return res.status(404).json({ message: CustomUtils.consts.NOT_EXIST });

    const jobUpdated = await Job.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(200).json(jobUpdated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE JOB
exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job)
      return res.status(404).json({ message: CustomUtils.consts.NOT_EXIST });
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
