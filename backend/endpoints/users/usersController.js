const User = require("./userModel");
const bcrypt = require("bcrypt");

// @Get all users
// @route GET /api/v1/users
// @access Public
exports.getAllUsers = async (req, res) => {
  try {
    let q = {};

    q = req.query.role ? { ...q, role: req.query.role } : q;

    console.log(q);

    const users = await User.find({ ...q });

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @Get user by id
// @route GET /api/v1/users/:id
// @access Public
exports.getUserById = async (req, res) => {
  // get user by id
  const user = await User.findById(req.params.id, "-__v");
  if (!user)
    return res
      .status(404)
      .json({ message: `User with id: ${req.params.id} not found !` });
  res.status(200).json(user);
};

// @Create user
// @route POST /api/v1/users
// @access Public
exports.createUser = async (req, res) => {
  try {
    if (req.body.password) {
      // const existingUsername = await User.findOne({
      //   username: req.body.username,
      // });
      // const existingEmail = await User.findOne({ email: req.body.email });
      // const existingPhone = await User.findOne({ phone: req.body.phone });
      // const existing = existingUsername || existingEmail || existingPhone;
      // if (existing) {
      //   res.status(400).json({ message: "Existing user !" });
      // } else {
      // Hash password with bcrypt
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;
      const user = await User.create(req.body);
      res.status(201).json(user);
    } else {
      res.status(400).json({ message: "Bad Request !" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Update user
// @route PUT /api/v1/users/:id
// @access Public
exports.updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: `User not found !` });
  // let existingUsername = req.body.username
  //   ? await User.findOne({
  //       username: req.body.username,
  //     })
  //       : null;
  //   existingUsername = existingUsername && existingUsername._id != req.params.id ? existingUsername : null;
  // let existingEmail = req.body.email
  //   ? await User.findOne({ email: req.body.email })
  //       : null;
  //   existingEmail = existingEmail && existingEmail._id != req.params.id ? existingEmail : null;
  // let existingPhone = req.body.phone
  //   ? await User.findOne({ phone: req.body.phone })
  //       : null;
  //   existingPhone = existingPhone && existingPhone._id != req.params.id ? existingPhone : null;
  // const existing = existingUsername || existingEmail || existingPhone;

  // if (existing) {
  //   res.status(400).json({ message: "Existing user !" });
  // } else {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
  }
  await User.findByIdAndUpdate(req.params.id, req.body);
  const userUpdated = await User.findById(req.params.id);
  res.status(200).json(userUpdated);
  // }
};

// @Delete user
// @route DELETE /api/v1/users/:id
// @access Public
exports.deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return res
      .status(404)
      .json({ message: `User with id: ${req.params.id} not found !` });
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "User deleted successfully !" });
};
