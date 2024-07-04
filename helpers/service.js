"use strict"

const { response } = require("express");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const ErrorCode = {
  REQUIRED_CODE: 400,
};

/**
 * Checks if there are validation errors in the request.
 *
 * @returns Returns true if there are validation errors, false otherwise.
 */
function hasValidatorErrors(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = errors.array()[0];
    res
      .status(400)
      .json(prepareResponse(ErrorCode.REQUIRED_CODE, err.msg, null));
    return true;
  } else {
    return false;
  }
}

/**
 * Prepares a structured response object.
 * @param {number} status - The status code of error.
 * @param {string} message - The message describing the error.
 * @param {any} data - Data to include in the error response.
 * @returns Returns a object with status, message, and optional data.
 */
function prepareResponse(status, message, data) {
  if (data != null || data != undefined) {
    return {
      responseCode: status,
      responseMessage: message,
      responseData: data,
    };
  } else {
    return {
      responseCode: status,
      responseMessage: message,
    };
  }
}

/**
 * Function use for hashing password using bcrypt
 *
 * @param {string} password - password
 * @returns {any} hashed password
 */
async function bcryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
}

module.exports = {
  hasValidatorErrors: hasValidatorErrors,
  prepareResponse: prepareResponse,
  bcryptPassword: bcryptPassword,
};
