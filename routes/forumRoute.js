"use strict";

const { body, param, query } = require("express-validator");
const express = require("express");
const router = express.Router();
const { Msg } = require("../errors/code");

const controller = require("../controllers/forumController");

router.post(
  "/create-forum",
  body("name").notEmpty().withMessage(Msg.FORUM_NAME_REQUIRED),
  body("description").notEmpty().withMessage(Msg.FORUM_DESCRIPTION_REQUIRED),
  body("createdBy").notEmpty().withMessage(Msg.FORUM_CREATOR_REQUIRED),
  body("categoryId").notEmpty().withMessage(Msg.FORUM_CATEGORY_ID_REQUIRED),
  controller.createForum
);
router.get(
  "/search-forum/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_FORUM_ID),
  controller.findForum
);
router.get("/search-forum", query("name").optional(), controller.forumList);
router.put(
  "/update-forum/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_FORUM_ID),
  controller.updateForum
);
router.delete(
  "/delete-forum/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_FORUM_ID),
  controller.deleteForum
);

module.exports = router;
