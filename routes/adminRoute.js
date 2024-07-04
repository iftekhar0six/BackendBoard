"use strict";

const { body, param, query } = require("express-validator");
const express = require("express");
const router = express.Router();

const { Msg } = require("../errors/code");
const controller = require("../controllers/adminController");

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
  body("role").notEmpty().withMessage(Msg.ROLE_REQUIRED),
  controller.registerAdmin
);
router.get(
  "/profile/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_USER_ID),
  controller.adminProfile
);
router.get("/list", query("email").optional(), controller.adminList);
router.put(
  "/update-profile/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_USER_ID),
  body("email").isEmail().withMessage(Msg.INVALID_EMAIL),
  body("password").isLength({ min: 6 }).withMessage(Msg.PASSWORD_SIX_CHAR),
  body("mobileNumber")
    .isLength({ min: 10, max: 12 })
    .withMessage(Msg.INVALID_MOBILE_NUMBER),
  controller.updateAdminProfile
);
router.delete(
  "/deactivate-admin/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_USER_ID),
  controller.deactivateAdmin
);

module.exports = router;
