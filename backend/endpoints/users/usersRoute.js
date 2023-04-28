const router = require("express").Router({ mergeParams: true });
const { getAllUsers, createUser, getUserById, updateUser, deleteUser } = require("./usersController");

require("dotenv").config();


const API_URL_BASE = process.env.API_URL_BASE ? process.env.API_URL_BASE : "/";

router
  .route(API_URL_BASE + "users")
  .get(getAllUsers)
  .post(createUser);

router
  .route(API_URL_BASE + "users/:id")
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

  module.exports = router;