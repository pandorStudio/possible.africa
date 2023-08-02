const Post = require("./postModel.js");
const CustomUtils = require("../../utils/index.js");

// @Get all posts
// @route GET /api/v1/posts
// @access Public

exports.getAllPosts = async (req, res) => {
  const { limit, page, sort, fields } = req.query;
  const queryObj = CustomUtils.advancedQuery(req.query);
  try {
    // const posts = await Post.find(queryObj)
    //   .limit(limit * 1)
    //   .skip((page - 1) * limit)
    //   .sort(sort)
    //   .select(fields);
    const posts = await Post.find(queryObj)
      .limit(limit * 1)
      .sort({ createdAt: -1, ...sort })
      .select(fields);
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @Get post by id
// @route GET /api/v1/posts/:id
// @access Public

exports.getPostById = async (req, res) => {
  try {
    // get post by id
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ message: CustomUtils.consts.NOT_EXIST });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Create post
// @route POST /api/v1/posts
// @access Public

exports.createPost = async (req, res) => {
  const CustomBody = { ...req.body };

  const title = CustomBody.title;
  const slug = CustomUtils.slugify(title);

  try {
    if (req.user) CustomBody.user = req.user._id;
    CustomBody.slug = slug;
    if (CustomBody.source) {
      const existantSource = await Post.find({ source: CustomBody.source });
      if (existantSource.length)
        return res
          .status(400)
          .json({ message: CustomUtils.consts.EXISTING_POST_WITH_SOURCE });
    }
    const post = await Post.create(CustomBody);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Update post
// @route PUT /api/v1/posts/:id
// @access Public

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: CustomUtils.consts.NOT_EXIST });
    }

    if (req.user) req.body.user = post.user;
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Delete post
// @route DELETE /api/v1/posts/:id
// @access Public
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: CustomUtils.consts.NOT_EXIST });
    }

    await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json({});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
