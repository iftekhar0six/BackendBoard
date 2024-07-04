"use strict";

const mongoose = require("mongoose");
require("dotenv").config();

/**
 * Connection to the MongoDB database.
 *
 * @returns Database connection detail
 */
const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.uri);
    console.log("Database connected successfully");
    return connection;
  } catch (error) {
    console.log("Database connection error", error);
  }
};

module.exports = { dbConnect };
