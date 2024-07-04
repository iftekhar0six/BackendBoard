"use strict";

const { body, param, query } = require("express-validator");
const express = require("express");
const router = express.Router();
const { Msg } = require("../errors/code");
const controller = require("../controllers/userController");

router.post(
  "/register",
  body("email")
    .notEmpty()
    .withMessage(Msg.EMAIL_REQUIRED)
    .isEmail()
    .withMessage(Msg.INVALID_EMAIL),
  body("password")
    .notEmpty()
    .withMessage(Msg.PASSWORD_REQUIRED)
    .isLength({ min: 6 })
    .withMessage(Msg.PASSWORD_SIX_CHAR),
  body("mobileNumber")
    .notEmpty()
    .withMessage(Msg.MOBILE_NUMBER_REQUIRED)
    .isLength({ min: 10, max: 12 })
    .withMessage(Msg.INVALID_MOBILE_NUMBER),
  controller.registerUser
);

router.get(
  "/profile/:id",
  param("id").isMongoId(Msg.INVALID_USER_ID),
  controller.userProfile
);

router.get(
  "/list",
  query("searchTerm").optional(),
  controller.userList
);

router.put(
  "/update-profile/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_USER_ID),
  body("email").isEmail().withMessage(Msg.INVALID_EMAIL),
  body("mobileNumber")
    .isLength({ min: 10, max: 12 })
    .withMessage(Msg.INVALID_MOBILE_NUMBER),
  body("password").isLength({ min: 6 }).withMessage(Msg.PASSWORD_SIX_CHAR),
  controller.updateProfile
);

router.delete(
  "/deactivate/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_USER_ID),
  controller.deactivateAccount
);

module.exports = router;
