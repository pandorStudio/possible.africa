const PostCategorie = require("./postCategorieModel.js");
const CustomUtils = require("../../utils/index.js");

// @Get all postCategories
// @route GET /api/v1/postCategories
// @access Public

exports.getAllPostCategories = async (req, res) => {
  const queryObj = CustomUtils.advancedQuery(req.query);
  try {
    const postCategories = await PostCategorie.find(queryObj);
    res.status(200).json(postCategories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @Get postCategorie by id
// @route GET /api/v1/postCategories/:id
// @access Public

exports.getPostCategorieById = async (req, res) => {
  try {
    // get postCategorie by id
    const postCategorie = await PostCategorie.findById(req.params.id);
    if (!postCategorie)
      return res.status(404).json({ message: CustomUtils.consts.NOT_FOUND });
    res.status(200).json(postCategorie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Create postCategorie
// @route POST /api/v1/postCategories
// @access Public

exports.createPostCategorie = async (req, res) => {
  try {
    const postCategorie = await PostCategorie.create(req.body);
    res.status(201).json(postCategorie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Update postCategorie
// @route PUT /api/v1/postCategories/:id
// @access Public

exports.updatePostCategorie = async (req, res) => {
  try {
    const postCategorie = await PostCategorie.findById(req.params.id);
    if (!postCategorie) {
      return res.status(404).json({ message: CustomUtils.consts.NOT_FOUND });
    }
    const updated = await PostCategorie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Delete postCategorie
// @route DELETE /api/v1/postCategories/:id
// @access Public

exports.deletePostCategorie = async (req, res) => {
  try {
    const postCategorie = await PostCategorie.findById(req.params.id);
    if (!postCategorie) {
      return res.status(404).json({ message: CustomUtils.consts.NOT_FOUND });
    }
    await PostCategorie.findByIdAndDelete(req.params.id);
    return res.status(200).json({});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
