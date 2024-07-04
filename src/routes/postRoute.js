"use strict";

const { body, param } = require("express-validator");
const express = require("express");
const router = express.Router();
const { Msg } = require("../errors/code");

const controller = require("../controllers/postController");

router.post(
  "/create-post",
  body("threadId").isMongoId().withMessage(Msg.THREAD_ID_REQUIRED),
  body("content").notEmpty().withMessage(Msg.POST_CONTENT_REQUIRED),
  body("createdBy").notEmpty().withMessage(Msg.POST_CREATOR_REQUIRED),
  controller.createPost
);
router.get(
  "/search-post/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_POST_ID),
  controller.findPost
);
router.get("/search-post", controller.postList);
router.put(
  "/update-post/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_POST_ID),
  controller.updatePost
);
router.delete(
  "/delete-post/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_POST_ID),
  controller.deletePost
);

module.exports = router;
