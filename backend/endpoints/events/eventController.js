const Event = require("./eventModel");
const Country = require("../countries/countryModel");
const CustomUtils = require("../../utils/index.js");

const transformJson = async () => {
  let nbFr = 0;
  const fs = require("fs");
  const path = require("path");
  const filePath = path.join(__dirname, "countries.json");
  const data = fs.readFileSync(filePath);
  const countries = JSON.parse(data);
  console.log(countries);

  const countryFromDb = await Country.find();

  const countriesReducted = countries.map((country) => {
    const {
      name,
      idd,
      flag,
      translations: { fra },
    } = country;
    return { name, idd, flag, translations: { fra } };
  });

  // const countriesReducted = countryFromDb.map((country, index) => {
  //   // const { name, idd, flag, translations } = country;
  //   // return { name, idd, flag };
  //   await Country.findByIdAndUpdate(country._id, countries[index]);
  // });

  // console.log(countriesReducted);
  for (let i = 0; i < countryFromDb.length; i++) {
    const country = countryFromDb[i];
    const newCountry = await Country.findByIdAndUpdate(
      country._id,
      countriesReducted[i],
      {
        new: true,
      }
    );
    console.log(newCountry);
    if(countriesReducted[i].translations.fra) nbFr++;
  }

  console.log(nbFr);
};

// @Gett all events
// @route GET /api/v1/events
// @access Public
exports.getAllEvents = async (req, res, next) => {
  // transformJson();
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @Gett all events
// @route GET /api/v1/events
// @access Public
exports.getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event)
      return res.status(404).json({ message: CustomUtils.consts.NOT_EXIST });
    res.status(200).json(event);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @Create a event
// @route POST /api/v1/events
// @access Public
exports.createEvent = async (req, res, next) => {
  const CustomBody = { ...req.body };
  const slug =
    CustomUtils.slugify(CustomBody.title) + "-" + CustomUtils.getRandomNbr();
  try {
    CustomBody.slug = slug;
    const event = await Event.create(CustomBody);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @Update a event
// @route PATCH /api/v1/events/:id
// @access Public
exports.updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: CustomUtils.consts.NOT_EXIST });
    }

    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Delete a event
// @route DELETE /api/v1/events/:id
// @access Public
exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: CustomUtils.consts.NOT_EXIST });
    }
    await Event.findByIdAndDelete(req.params.id);
    return res.status(200).json({});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
