const { connect } = require("mongoose");
require("dotenv").config({});

const MONGO_URI = process.env.MONGO_URI;

const mongoConnection = () => {
  return connect(MONGO_URI);
};

module.exports = { mongoConnection };
