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
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ message: `User with id: ${req.params.id} not found !` });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Create user
// @route POST /api/v1/users
// @access Public
exports.createUser = async (req, res) => {
  try {
    const bodyWR = { ...req.body };
    delete bodyWR.role;
    const newUser = await User.create(bodyWR);
    await User.findByIdAndUpdate(newUser._id, { password: body.password });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Update user
// @route PUT /api/v1/users/:id
// @access Public
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: `User not found !` });
    await User.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
    });
    const userUpdated = await User.findById(req.params.id);
    res.status(200).json(userUpdated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  // }
};

// @Delete user
// @route DELETE /api/v1/users/:id
// @access Public
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ message: `User with id: ${req.params.id} not found !` });
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
