const mongoose = require("mongoose");
require("dotenv").config();

const URL = process.env.MONGO_URL ?? "mongodb://127.0.0.1:27017";
const auth = {
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASSWORD,
  dbName: process.env.MONGO_DB,
};

module.exports = mongoose.connect(URL, auth);
