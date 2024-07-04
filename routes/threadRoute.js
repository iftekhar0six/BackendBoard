"use strict";

const { body, param } = require("express-validator");
const express = require("express");
const router = express.Router();
const { Msg } = require("../errors/code");

const threadController = require("../controllers/threadController");

router.post(
  "/create-thread",
  body("forumId").isMongoId().withMessage(Msg.FORUM_ID_REQUIRED),
  body("title").notEmpty().withMessage(Msg.THREAD_TITLE_REQUIRED),
  body("content").notEmpty().withMessage(Msg.THREAD_CONTENT_REQUIRED),
  body("createdBy").notEmpty().withMessage(Msg.THREAD_CREATOR_REQUIRED),
  threadController.createThread
);
router.get(
  "/search-thread/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_THREAD_ID),
  threadController.findThread
);
router.get("/search-thread", threadController.threadList);
router.put(
  "/update-thread/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_THREAD_ID),
  threadController.updateThread
);
router.delete(
  "/delete-thread/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_THREAD_ID),
  threadController.deleteThread
);

module.exports = router;
