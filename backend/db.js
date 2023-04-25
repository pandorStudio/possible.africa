const mongoose = require("mongoose");

const connection = (URL_CONNECT_DEV) => {
  mongoose
    .connect(URL_CONNECT_DEV)
    .then(() => {
      console.log("Database connection successful ...");
    })
    .catch((e) => {
      console.log("Something went wrong, Error: " + e);
    });
};

// Export connection
module.exports = connection;