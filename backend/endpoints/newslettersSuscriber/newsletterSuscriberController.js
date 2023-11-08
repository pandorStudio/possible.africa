const NewslettersSuscriber = require("./newsletterSuscriberModel.js");
const CustomUtils = require("../../utils/index.js");


// @Get all NewslettersSuscribers
// @route GET /api/v1/NewslettersSuscribers
// @access Public

exports.getAllNewslettersSuscribers = async (req, res) => {
  const { limit, page, sort, fields } = req.query;
  const queryObj = CustomUtils.advancedQuery(req.query);
  try {
    const newslettersSuscribers = await NewslettersSuscriber.find(queryObj)
      .sort({ createdAt: -1, ...sort })
      .limit(limit * 1)
      .select(fields);

    res.status(200).json(newslettersSuscribers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @Get NewslettersSuscriber by id
// @route GET /api/v1/NewslettersSuscribers/:id
// @access Public

exports.getNewslettersSuscriberById = async (req, res) => {
  try {
    // get NewslettersSuscriber by id
    const newslettersSuscriber = await NewslettersSuscriber.findById(
      req.params.id
    );
    if (!newslettersSuscriber)
      return res.status(404).json({ message: CustomUtils.consts.NOT_FOUND });
    res.status(200).json(newslettersSuscriber);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // @Create NewslettersSuscriber
// // @route POST /api/v1/NewslettersSuscribers
// // @access Public

exports.createNewslettersSuscriber = async (req, res) => {
  try {
    // CustomBody.slug = slug;
    const newslettersSuscriber = await NewslettersSuscriber.create(req.body);
    res.status(201).json(newslettersSuscriber);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // @Update NewslettersSuscriber
// // @route PUT /api/v1/NewslettersSuscribers/:id
// // @access Public

exports.updateNewslettersSuscriber = async (req, res) => {
  try {
    const newslettersSuscriber = await NewslettersSuscriber.findById(req.params.id);
    if (!newslettersSuscriber) {
      return res.status(404).json({ message: CustomUtils.consts.NOT_FOUND });
    }
    const updated = await NewslettersSuscriber.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // @Delete NewslettersSuscriber
// // @route DELETE /api/v1/NewslettersSuscribers/:id
// // @access Public

exports.deleteNewslettersSuscriber = async (req, res) => {
  try {
    const newslettersSuscriber = await NewslettersSuscriber.findById(req.params.id);
    if (!newslettersSuscriber) {
      return res.status(404).json({ message: CustomUtils.consts.NOT_FOUND });
    }
    await NewslettersSuscriber.findByIdAndDelete(req.params.id);
    return res.status(200).json({});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
