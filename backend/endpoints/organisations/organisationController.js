const Organisation = require("./organisationModel");
const Country = require("../countries/countryModel");
const OrganisationType = require("../organisationTypes/organisationTypeModel");
const download = require("image-downloader");
const CustomUtils = require("../../utils/index.js");
const axios = require("axios");
const { Buffer } = require("buffer");
const fs = require("fs");
const Path = require("path");
const stream = require("stream");
const { promisify } = require("util");
const pipeline = promisify(stream.pipeline);
require("dotenv").config();

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const ORGANISATIONS_BASE_ID = process.env.ORGANISATIONS_BASE_ID;
const ORGANISATION_TABLE_ID = process.env.ORGANISATION_TABLE_ID;
const ENV = process.env.ENV;
const PORT = process.env.PORT;
var Airtable = require("airtable");

function extraireDomaine(url) {
  const regex = /^(https?:\/\/)?([\w\d-]+\.)+[\w\d-]+/;
  const match = url.match(regex);
  return match ? match[0] : null;
}

function fileExists(filePath) {
  try {
    fs.access(filePath);
    return true; // Le fichier existe
  } catch (error) {
    return false; // Le fichier n'existe pas
  }
}

async function downloadImage(url, path) {
  if (fileExists(path)) {
    // console.log(`Le fichier existe déjà : ${path}`);
    return false;
  }

  try {
    const response = await fetch(url);

    await pipeline(response.body, fs.createWriteStream(path));
    // console.log(`Image téléchargée et sauvegardée comme ${path}`);
    return path;
  } catch (e) {
    console.log(e);
  }
}

const fetchAllRecords = async (apiKey, baseId, tableName, limit, eq) => {
  var base = new Airtable({
    apiKey: apiKey,
  }).base(baseId);

  let allRecords = [];
  try {
    const records = await base(tableName)
      .select({
        sort: [
          {
            field: "Date Added",
            direction: "desc",
          },
        ],
      })
      .all();
    records.forEach((record) => {
      const logoPrefix =
        ENV === "dev"
          ? `http://localhost:${PORT}/storage/logos/airtable/`
          : `https://api.possible.africa/storage/logos/airtable/`;
      if (record.get("Logo")) {
        allRecords.push({
          _id: record.get("Name"),
          name: record.get("Name"),
          logo: record.get("Logo")[0].url,
          description: record.get("Description"),
          region: record.get("Region"),
          headquarter: record.get("Headquarter"),
          operationnal_countries: record.get("Operating Countries"),
          sector: record.get("Sector"),
          related_articles: record.get("Articles Related"),
          website: record.get("Website"),
          publication_date: record.get("Date Added"),
          source: record.get("Source"),
        });
      } else {
        allRecords.push({
          _id: record.get("Name"),
          name: record.get("Name"),
          logo: `${logoPrefix}${record
            .get("Name")
            .split(" ")
            .join("")
            .toLowerCase()}.jpg`,
          description: record.get("Description"),
          region: record.get("Region"),
          headquarter: record.get("Headquarter"),
          operationnal_countries: record.get("Operating Countries"),
          sector: record.get("Sector"),
          related_articles: record.get("Articles Related"),
          website: record.get("Website"),
          publication_date: record.get("Date Added"),
          source: record.get("Source"),
        });
      }
    });

    if (eq["Name"]) {
      allRecords = allRecords.filter((r) =>
        r.name.includes(eq["Name"].toLowerCase())
      );
    }
    return allRecords;
  } catch (err) {
    console.error(err);
  }
};

exports.getOrganisationsFromAirtable = async (req, res) => {
  const { limit, page, sort, fields } = req.query;
  const queryObj = CustomUtils.advancedQueryAirtable(req.query);
  try {
    const result = await fetchAllRecords(
      AIRTABLE_API_KEY,
      ORGANISATIONS_BASE_ID,
      ORGANISATION_TABLE_ID,
      limit * 1,
      queryObj
    );
    // console.log(result);
    // res.status(200).json(result);
    const organisations = await result.map(async (organisation) => {
      const ExistingOrg = await Organisation.find({
        name: organisation.name,
      });
      // console.log(ExistingOrg.length);
      if (ExistingOrg.length === 0) {
        try {
          const org = await Organisation.create({
            name: organisation.name,
            airLogo: organisation.logo,
            airDescription: organisation.description,
            airRegion: organisation.region,
            airHeadquarter: organisation.headquarter,
            airOperatingCountries: organisation.operationnal_countries,
            airSector: organisation.sector,
            airWebsite: organisation.website,
            airRelatedArticles: organisation.related_articles,
            airSource: organisation.source,
          });
          // console.log(org);
        } catch (e) {
          console.log(e);
        }
      }
      // console.log(ExistingOrg);
    });

    res.status(200).json({ success: true });
    // console.log(organisations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

async function downloadMedia(mediaUrl) {
  try {
    const options = {
      url: mediaUrl,
      dest: "../../endpoints/organisations/img",
      extractFilename: true,
    };
    const res = await download.image(options);
    const imageData = fs.readFileSync(res.filename).toString("base64");
    const dataUrl = `data:${`image/${res.filename
      .split(".")
      .pop()}`};base64,${imageData}`;
    fs.unlinkSync(res.filename);
    return dataUrl;
  } catch (error) {
    console.error(error);
    return null;
  }
}

exports.getMetaData = async (req, res) => {
  try {
    const response = await axios.get(req.query.url);
    // Traitez la réponse selon vos besoins, par exemple, extrayez la méta-description.
    // Vous pouvez ensuite renvoyer ces données au frontend.
    res.json(response.data);
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
};

exports.getWpImageBuffer = async (req, res) => {
  const dataUrl = await downloadMedia(req.body.url);
  return res.status(200).json({ dataUrl });
};

exports.getAllOrganisationsFromAirtable = async (req, res) => {
  const { limit, page, sort, fields } = req.query;
  const queryObj = CustomUtils.advancedQuery(req.query);
  // console.log(queryObj);
  try {
    const organisations = await Organisation.find(queryObj)
      .limit(limit * 1)
      .sort({ createdAt: -1, ...sort })
      .select(fields);
    res.status(200).json(organisations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @Get all organisations
// @route GET /api/v1/organisations
// @access Public
exports.getAllOrganisations = async (req, res) => {
  let { limit, page, sort, fields, _start, _end } = req.query;
  const queryObj = CustomUtils.advancedQuery(req.query);
  // console.log(queryObj);
  try {
    if (_end && (_start || _start == 0)) {
      limit = _end - _start;
    }
    const organisations = await Organisation.find(queryObj)
      .limit(limit * 1)
      .skip(_start ? _start : 0)
      .sort({ createdAt: -1, ...sort })
      .select(fields);
    // console.log(organisations);
    organisations.map(async (organisation) => {
      console.log(organisation.airWebsite);
      if (
        organisation.airWebsite !== null &&
        organisation.airWebsite !== undefined
      ) {
        let domain_racine = extraireDomaine(organisation.airWebsite);
        // console.log(domain_racine);
        if (domain_racine) {
          domain_racine = domain_racine.slice(8);
          const url = `https://logo.clearbit.com/${domain_racine}`;
          const path = `${Path.resolve(
            __dirname,
            "../../public/storage/logos"
          )}/${domain_racine.split(".").join("")}.jpg`;
          await downloadImage(url, path);
          let urla = "";
          if (ENV === "dev") {
            urla = `http://localhost:${PORT}/storage/logos/${domain_racine
              .split(".")
              .join("")}.jpg`;
          } else {
            urla = `https://api.possible.africa/storage/logos/${domain_racine
              .split(".")
              .join("")}.jpg`;
          }
          await Organisation.findByIdAndUpdate(organisation._id, {
            airLogo: urla,
          });
        } else {
          await Organisation.findByIdAndUpdate(organisation._id, {
            airLogo: organisation.logo,
          });
        }
      }
      // return orgaFin;
    });

    const orgs = await Organisation.find(queryObj)
      .limit(limit * 1)
      .skip(_start ? _start : 0)
      .sort({ createdAt: -1, ...sort })
      .select(fields);
    res.status(200).json(orgs);
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
  const slug = CustomUtils.slugify(name);
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
  const CustomBody = { ...req.body };
  try {
    const organisation = await Organisation.findById(req.params.id);
    if (!organisation) {
      return res.status(404).json({ message: CustomUtils.consts.NOT_EXIST });
    }

    if (req.user) CustomBody.contributeur = organisation.contributeur;

    const updatedOrganisation = await Organisation.findByIdAndUpdate(
      req.params.id,
      CustomBody,
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
