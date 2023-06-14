const Organisation = require("./organisationModel");
const OrganisationType = require("../organisationTypes/organisationTypeModel");
const CustomUtils = require("../../utils/index.js");
const axios = require("axios");
const { Buffer } = require("buffer");
const { UploadImage } = require("../uploads/uploadsController.js");
const BUCKET_NAME = process.env.BUCKET_NAME;

async function downloadMedia(mediaUrl) {
  try {
    const response = await axios.get(mediaUrl, {
      responseType: "arraybuffer",
    });

    const fileBuffer = Buffer.from(response.data, "binary");
    return fileBuffer;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function transformMediaUrl(mediaUrl) {
  try {
    const apiUrl = "https://www.possible.africa/wp-json/wp/v2/media";
    const response = await axios.get(apiUrl, {
      params: {
        search: mediaUrl,
        per_page: 1,
      },
    });

    if (response.data.length > 0) {
      const transformedUrl = response.data[0].guid.rendered;
      return transformedUrl;
    } else {
      console.error("Media not found");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

exports.getWpImageBuffer = async (req, res) => {
  const buffer = await downloadMedia(req.body.url);
  // const base64 = buffer.toString('base64')
  return res.status(200).json(buffer);
};

// const mediaUrl =
//   "https://www.possible.africa/wp-content/uploads/2023/03/Matrix-Software_logo-1.jpg?wpId=12603";
// transformMediaUrl(mediaUrl).then((transformedUrl) => {
//   console.log("Transformed URL:", transformedUrl);
// });

// @Get all organisations
// @route GET /api/v1/organisations
// @access Public
exports.getAllOrganisations = async (req, res) => {
  const { limit = 10, page, sort, fields } = req.query;
  const queryObj = CustomUtils.advancedQuery(req.query);
  try {
    const organisations = await Organisation.find(queryObj)
      .limit(limit * 1)
      .sort(sort)
      .select(fields);
    res.status(200).json(organisations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @Get organisation by id
// @route GET /api/v1/organisations/:id
// @access Public
exports.getOrganisationById = async (req, res) => {
  // get organisation by id
  try {
    const organisation = await Organisation.findById(req.params.id);
    if (!organisation)
      return res.status(404).json({
        message: CustomUtils.consts.NOT_EXIST,
      });
    res.status(200).json(organisation);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @Create organisation
// @route POST /api/v1/organisations
// @access Public
exports.createOrganisation = async (req, res) => {
  const CustomBody = { ...req.body };
  const name = CustomBody.name;
  const slug = CustomUtils.slugify(name) + "-" + CustomUtils.getRandomNbr();
  // if (CustomBody.logo) {
  //   const response = await downloadMedia(CustomBody.logo);
  //   const originalName =
  //     CustomBody.name + "_logo_" + CustomUtils.getRandomNbr();
  //   const file = {
  //     fieldname: "logo",
  //     originalname: originalName,
  //   };
  //   req.file = file;
  //   const res = await UploadImage.single("logo");
  //   if (req.file.location) {
  //     console.log(req.file.location);
  //   }

  // CustomBody.logo = data.Location;
  // console.log(CustomBody.logo);
  // }

  try {
    if (req.user) CustomBody.contributeur = req.user._id;
    CustomBody.slug = slug;
    const organisation = await Organisation.create(CustomBody);
    res.status(201).json(organisation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Update organisation
// @route PUT /api/v1/organisations/:id
// @access Public
exports.updateOrganisation = async (req, res) => {
  try {
    const organisation = await Organisation.findById(req.params.id);
    if (!organisation) {
      return res.status(404).json({ message: CustomUtils.consts.NOT_EXIST });
    }

    const updatedOrganisation = await Organisation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedOrganisation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @Delete organisation
// @route DELETE /api/v1/organisations/:id
// @access Public
exports.deleteOrganisation = async (req, res) => {
  try {
    const organisation = await Organisation.findById(req.params.id);
    if (!organisation) {
      return res.status(404).json({ message: CustomUtils.consts.NOT_EXIST });
    }
    await Organisation.findByIdAndDelete(req.params.id);
    res.json({});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
