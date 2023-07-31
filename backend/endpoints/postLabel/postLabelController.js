const PostLabel = require("./postLabelModel.js");
const CustomUtils = require("../../utils/index.js");

// @Get all postLabels
// @route GET /api/v1/postLabels
// @access Public

exports.getAllPostLabels = async (req, res) => {
  const queryObj = CustomUtils.advancedQuery(req.query);
  try {
    const postLabels = await PostLabel.find(queryObj);
    res.status(200).json(postLabels);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @Get postLabel by id
// @route GET /api/v1/postLabels/:id
// @access Public

exports.getPostLabelById = async (req, res) => {
  try {
    // get postLabel by id
    const postLabel = await PostLabel.findById(req.params.id);
    if (!postLabel)
      return res.status(404).json({ message: CustomUtils.consts.NOT_FOUND });
    res.status(200).json(postLabel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Create postLabel
// @route POST /api/v1/postLabels
// @access Public

exports.createPostLabel = async (req, res) => {
  const CustomBody = { ...req.body };
  const slug = CustomUtils.slugify(CustomBody.name);
  try {
    CustomBody.slug = slug;
    const postLabel = await PostLabel.create(CustomBody);
    res.status(201).json(postLabel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Update postLabel
// @route PUT /api/v1/postLabels/:id
// @access Public

exports.updatePostLabel = async (req, res) => {
  try {
    const postLabel = await PostLabel.findById(req.params.id);
    if (!postLabel) {
      return res.status(404).json({ message: CustomUtils.consts.NOT_FOUND });
    }
    const updated = await PostLabel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Delete postLabel
// @route DELETE /api/v1/postLabels/:id
// @access Public

exports.deletePostLabel = async (req, res) => {
  try {
    const postLabel = await PostLabel.findById(req.params.id);
    if (!postLabel) {
      return res.status(404).json({ message: CustomUtils.consts.NOT_FOUND });
    }
    await PostLabel.findByIdAndDelete(req.params.id);
    return res.status(200).json({});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
