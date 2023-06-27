const User = require("../users/userModel");
const jwt = require("jsonwebtoken");
const CustomUtils = require("../../utils/index.js");

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

exports.signup = async (req, res, next) => {
  try {
    const bodyWR = { ...req.body };
    delete bodyWR.role;

    // Generate a random four digit number
    let usernameExist = true;
    while (usernameExist) {
      bodyWR.username = CustomUtils.generateUsername();
      const existingUser = await User.find({ username: bodyWR.username });
      if (!existingUser.length) {
        usernameExist = false;
      }
    }
    const slug =
      CustomUtils.slugify(bodyWR.title) + "-" + CustomUtils.getRandomNbr();
    bodyWR.slug = slug;
    const newUser = await User.create(bodyWR);
    await User.findByIdAndUpdate(newUser._id, { password: req.body.password });
    const token = signToken(newUser._id);

    res.status(201).json({
      status: "success",
      token,
      data: { user: newUser },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.signin = async (req, res, next) => {
  try {
    let token = "";
    // Test if email and password exist
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: CustomUtils.consts.MISSING_DATA });

    // Test if user exists && password is correct
    const user = await User.findOne({ email }).select("+password");
    //console.log(user);

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: CustomUtils.consts.UNAUTHORIZED });
    } else {
      // If everything ok, send token to client
      token = signToken(user._id);
    }

    res.status(200).json({ status: "success", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.protect = async (req, res, next) => {
  try {
    // 1) Getting token and check if it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      console.log("token found", token);
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      /*return res.status(401).json({
        message: CustomUtils.consts.NOT_LOGGED_IN,
      });*/
      return next();
    }

    // 2) Verification token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      /*return res.status(401).json({
        message: CustomUtils.consts.UNAUTHORIZED,
      });*/
      return next();
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    // console.log("token found", currentUser);
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    //console.log(req.user);
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: CustomUtils.consts.UNAUTHORIZED,
      });
    }

    next();
  };
};
