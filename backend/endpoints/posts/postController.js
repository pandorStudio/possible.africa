const Post = require("./postModel.js");
const CustomUtils = require("../../utils/index.js");
const fetch = require("node-fetch");
const fs = require("fs");
const stream = require("stream");
const { promisify } = require("util");
const pipeline = promisify(stream.pipeline);
const Path = require("path");
// const Airtable = require("airtable");
require("dotenv").config();
const axios = require("axios");

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true; // Le fichier existe
  } catch (error) {
    return false; // Le fichier n'existe pas
  }
}

async function downloadImage(url, path) {
  if (await fileExists(path)) {
    console.log(`Le fichier existe déjà : ${path}`);
    return false;
  }

  const response = await fetch(url);
  if (!response.ok)
    throw new Error(
      `Échec du téléchargement de l'image : ${response.statusText}`
    );
  await pipeline(response.body, fs.createWriteStream(path));
  // console.log(`Image téléchargée et sauvegardée comme ${path}`);
  return path;
}

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const ENGLISH_BASE_ID = process.env.ENGLISH_BASE_ID;
const FRENCH_BASE_ID = process.env.FRENCH_BASE_ID;
const FRENCH_ARTICLE_TABLE_ID = process.env.FRENCH_ARTICLE_TABLE_ID;
const ENGLISH_ARTICLE_TABLE_ID = process.env.ENGLISH_ARTICLE_TABLE_ID;
const ALL_ARTICLE_BASE_ID = process.env.ALL_ARTICLE_BASE_ID;
const ALL_ARTICLE_TABLE_ID = process.env.ALL_ARTICLE_TABLE_ID;
const ENV = process.env.ENV;
const PORT = process.env.PORT;

// const endpointUrl = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

// const airtable = Airtable.configure({
//   endpointUrl: "https://api.airtable.com",
//   apiKey: AIRTABLE_API_KEY,
// });
// // @Get all posts
// // @route GET /api/v1/posts
// // @access Public

// const base_english = airtable.base(ENGLISH_TABLE_ID);

// const base_french = airtable.base(FRENCH_TABLE_ID);

// const base_all = new Airtable({
//   apiKey: AIRTABLE_API_KEY,
// }).base(ALL_TABLE_ID);

var Airtable = require("airtable");

const fetchAllRecords = async (apiKey, baseId, tableName, limit) => {
  var base = new Airtable({
    apiKey: apiKey,
  }).base(baseId);

  let allRecords = [];
  try {
    // Sélectionnez tous les records et attendez leur chargement complet
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

    // Traitez chaque record individuellement
    records.forEach((record) => {
      // console.log("Retrieved", record.get("Article ID"));
      if (record.get("Logo copy")) {
        allRecords.push({
          _id: record.get("Article ID"),
          title: record.get("Article Title"),
          tags: record.get("Tags from Feedly"),
          media: record.get("Name of Media"),
          language: record.get("Language"),
          link: record.get("Link to Article"),
          publication_date: record.get("Date Added"),
          logo: record.get("Logo copy"),
        });
      } else {
        allRecords.push({
          _id: record.get("Article ID"),
          title: record.get("Article Title"),
          tags: record.get("Tags from Feedly"),
          media: record.get("Name of Media"),
          language: record.get("Language"),
          link: record.get("Link to Article"),
          publication_date: record.get("Date Added"),
        });
      }
    });

    // console.log(allRecords.slice(0, 5));
    // Retournez ou traitez `allRecords` comme nécessaire
    const recordsToBeReturned = allRecords.slice(0, limit);
    const recordsToBeRetured = await Promise.all(
      recordsToBeReturned.map(async (e) => {
        if (e.logo && e.link) {
          let link = e.link.slice(8);
          const regex = /\//g;
          const index = link.search(regex);
          link = link.slice(0, index);
          // console.log(link);
          const path = `${Path.resolve(
            __dirname,
            "../../public/storage/logos/airtable"
          )}/${link}.jpg`;
          const result = downloadImage(e.logo, path);
          // console.log(result);

          // if (result) {
          const regex2 = /public\\/;
          const publicIndex = path.search(regex2);
          const reformedPath = path.slice(publicIndex + 6);
          if (ENV === "dev") {
            e.logo = `http://localhost:${PORT}${reformedPath}`;
          } else {
            e.logo = `https://api.possible.africa${reformedPath}`;
          }
          // console.log(e);
          return e;
          // } else {
          //   e.logo = path;
          //   return e;
          // }
        }
        return e;
      })
    );

    // console.log(recordsToBeRetured);
    return recordsToBeRetured;
  } catch (err) {
    console.error(err);
    // Gérez l'erreur comme nécessaire
  }
};

exports.getFrenchPostFromAirtable = async (req, res) => {
  const { limit, page, sort, fields } = req.query;
  // const queryObj = CustomUtils.advancedQuery(req.query);
  try {
    const result = await fetchAllRecords(
      AIRTABLE_API_KEY,
      FRENCH_BASE_ID,
      FRENCH_ARTICLE_TABLE_ID,
      limit * 1
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getAllPostFromAirtable = async (req, res) => {
  try {
    const result = await fetchAllRecords(
      AIRTABLE_API_KEY,
      ALL_ARTICLE_BASE_ID,
      ALL_ARTICLE_TABLE_ID
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getEnglishPostFromAirtable = async (req, res) => {
  const { limit, page, sort, fields } = req.query;
  // const queryObj = CustomUtils.advancedQuery(req.query);
  try {
    const result = await fetchAllRecords(
      AIRTABLE_API_KEY,
      ENGLISH_BASE_ID,
      ENGLISH_ARTICLE_TABLE_ID,
      limit * 1
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  const { limit, page, sort, fields } = req.query;
  const queryObj = CustomUtils.advancedQuery(req.query);
  try {
    // console.log(base_french);
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
