const Country = require("./countryModel.js");
const CustomUtils = require("../../utils/index.js");

// @Get all UserRoles
// @route GET /api/v1/UserRoles
// @access Public

exports.getAllCountries = async (req, res) => {
  const queryObj = CustomUtils.advancedQuery(req.query);
  try {
    const countries = await Country.find(queryObj).sort({ createdAt: -1 });

    res.status(200).json(
      countries.sort((a, b) => {
        return a.translations.fra.common > b.translations.fra.common ? 1 : -1;
      })
    );
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @Get UserRole by id
// @route GET /api/v1/UserRoles/:id
// @access Public

exports.getCountryById = async (req, res) => {
  try {
    // get UserRole by id
    const country = await Country.findById(req.params.id);
    if (!country)
      return res.status(404).json({ message: CustomUtils.consts.NOT_FOUND });
    res.status(200).json(country);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // @Create UserRole
// // @route POST /api/v1/UserRoles
// // @access Public

exports.createCountry = async (req, res) => {
  // const CustomBody = { ...req.body };
  // const slug =
  //   CustomUtils.slugify(CustomBody.name);
  try {
    // CustomBody.slug = slug;
    const country = await Country.create(req.body);
    res.status(201).json(country);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // @Update UserRole
// // @route PUT /api/v1/UserRoles/:id
// // @access Public

// exports.updateUserRole = async (req, res) => {
//   try {
//     const userRole = await UserRole.findById(req.params.id);
//     if (!UserRole) {
//       return res.status(404).json({ message: CustomUtils.consts.NOT_FOUND });
//     }
//     const updated = await UserRole.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     return res.status(200).json(updated);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @Delete UserRole
// // @route DELETE /api/v1/UserRoles/:id
// // @access Public

// exports.deleteUserRole = async (req, res) => {
//   try {
//     const userRole = await UserRole.findById(req.params.id);
//     if (!userRole) {
//       return res.status(404).json({ message: CustomUtils.consts.NOT_FOUND });
//     }
//     await UserRole.findByIdAndDelete(req.params.id);
//     return res.status(200).json({});
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
