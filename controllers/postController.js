"use strict";

const posts = require("../models/postModel");
const postRepo = require("../data_access/postData");
const service = require("../helpers/service");
const { StatusCode, Msg } = require("../errors/code");

module.exports = {
  /**
   * Create a Post
   *
   * @param {string} req.body.threadId - The thread's id.
   * @param {string} req.body.content - The content of post.
   * @param {string} req.body.createdBy -The creator of the post.
   * @param {string} req.body.attachments - The attachments of the post.
   * @returns Post creating detail
   */
  createPost: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const detail = {
        threadId: req.body.threadId,
        content: req.body.content,
        createdBy: req.body.createdBy,
        attachments: req.body.attachments,
      };

      const newPost = await postRepo.createPost(detail);
      return res.send(
        service.prepareResponse(StatusCode.SUCCESS, Msg.POST_CREATED, {
          id: newPost.id,
        })
      );
    } catch (error) {
      return res.send(
        service.prepareResponse(
          StatusCode.INTERNAL_SERVER_ERROR,
          Msg.INTERNAL_SERVER_ERROR
        )
      );
    }
  },

  /**
   * Find a Post
   *
   * @param {string} req.params.id - The post's id.
   * @returns Post finding detail
   */
  findPost: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const searchPost = await postRepo.findPostById(req.params.id);
      if (!searchPost) {
        return res.send(
          service.prepareResponse(StatusCode.NOT_FOUND, Msg.POST_NOT_FOUND)
        );
      }
      return res.send(
        service.prepareResponse(StatusCode.SUCCESS, Msg.SUCCESS, {
          id: searchPost.id,
        })
      );
    } catch (error) {
      return res.send(
        service.prepareResponse(
          StatusCode.INTERNAL_SERVER_ERROR,
          Msg.INTERNAL_SERVER_ERROR
        )
      );
    }
  },

  /**
   * Get Post's list
   *
   * @returns Post's list detail
   */
  postList: async function (req, res) {
    try {
      const allPostList = await postRepo.postList();
      return res.send(
        service.prepareResponse(StatusCode.SUCCESS, Msg.SUCCESS, allPostList)
      );
    } catch (error) {
      return res.send(
        service.prepareResponse(
          StatusCode.INTERNAL_SERVER_ERROR,
          Msg.INTERNAL_SERVER_ERROR
        )
      );
    }
  },

  /**
   * Update a Post
   *
   * @param {string} req.params.id - The post's id.
   * @param {string} req.body.threadId - The thread's id.
   * @param {string} req.body.content - The content of post.
   * @param {string} req.body.createdBy -The creator of the post.
   * @param {string} req.body.attachments - The attachments of the post.
   * @returns Post updating detail
   */
  updatePost: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const postId = req.params.id;
      const detail = {
        threadId: req.body.threadId,
        content: req.body.content,
        createdBy: req.body.createdBy,
        attachments: req.body.attachments,
      };

      const updatePost = await postRepo.updatePost(postId, detail);

      if (!updatePost) {
        return res.send(
          service.prepareResponse(StatusCode.NOT_FOUND, Msg.POST_NOT_FOUND)
        );
      }
      return res.send(
        service.prepareResponse(StatusCode.SUCCESS, Msg.POST_UPDATED, {
          id: updatePost.id,
        })
      );
    } catch (error) {
      return res.send(
        service.prepareResponse(
          StatusCode.INTERNAL_SERVER_ERROR,
          Msg.INTERNAL_SERVER_ERROR
        )
      );
    }
  },

  /**
   * Delete a Post
   *
   * @param {string} req.params.id - The post's id.
   * @returns Post deleting detail
   */
  deletePost: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const postId = req.params.id;
      const deletePost = await postRepo.deletePost(postId);
      if (!deletePost) {
        return res.send(
          service.prepareResponse(StatusCode.NOT_FOUND, Msg.POST_NOT_FOUND)
        );
      }
      return res.send(
        service.prepareResponse(StatusCode.SUCCESS, Msg.POST_DELETED)
      );
    } catch (error) {
      return res.send(
        service.prepareResponse(
          StatusCode.INTERNAL_SERVER_ERROR,
          Msg.INTERNAL_SERVER_ERROR
        )
      );
    }
  },
};
