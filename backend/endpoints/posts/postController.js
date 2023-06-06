const Post = require("./postModel.js");
const CustomUtils = require("../../utils/index.js");

// @Get all posts
// @route GET /api/v1/posts
// @access Public

exports.getAllPosts = async (req, res) => {
  const queryObj = CustomUtils.advancedQuery(req.query);
  try {
    const posts = await Post.find(queryObj);
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
  // Extract img tags from content
  // const content = req.body.content;
  // const imgTags = content.match(/<img[^>]+src="([^">]+)"/g);

  // // Extract img src value from img tags
  // const imgSrcs = imgTags.map((imgTag) => {
  //   return imgTag
  //     .match(/src="([^">]+)"/g)[0]
  //     .replace('src="', "")
  //     .replace('"', "");
  // });

  // // Upload images with multer by img src value and save file path in variable
  // const imgPaths = imgSrcs.map((imgSrc) => {
  //   upload.single(imgSrc);
  // });

  // imgSrcs.forEach((imgSrc) => {
  //   upload.single(imgSrc);
  // });

  // console.log(imgPaths);
  // res.status(201).json({});
  const CustomBody = { ...req.body };
  
  const name = CustomBody.name;
  const slug = CustomUtils.slugify(name) + "-" + CustomUtils.getRandomNbr();
  try {
    CustomBody.slug = slug;
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
