"use strict";

const forumRepo = require("../data_access/forumData");
const service = require("../helpers/service");
const { StatusCode, Msg } = require("../errors/code");

module.exports = {
  /**
   * Create a Forum
   *
   * @param {string} req.body.name - The forum's name.
   * @param {string} req.body.description - The description of forum.
   * @param {string} req.body.categoryId - The category id of forum.
   * @param {string} req.body.createdBy - The creator of the forum.
   * @param {string} req.body.moderators - The moderators of the forum.
   * @param {string} req.body.rules - The rules of forums.
   * @param {string} req.body.logoUrl - The url of logo.
   * @returns forum register detail
   */
  createForum: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const detail = {
        name: req.body.name,
        description: req.body.description,
        categoryId: req.body.categoryId,
        createdBy: req.body.createdBy,
        moderators: req.body.moderators,
        rules: req.body.rules,
        logoUrl: req.body.logoUrl,
      };

      const existForum = await forumRepo.getDetail({
        name: detail.name,
      });

      if (existForum) {
        return res.send(
          service.prepareResponse(
            StatusCode.ALREADY_EXIST,
            Msg.FORUM_NAME_EXIST
          )
        );
      }
      const newForum = await forumRepo.createForum(detail);
      return res.send(
        service.prepareResponse(StatusCode.SUCCESS, Msg.FORUM_CREATED, {
          id: newForum.id,
        })
      );
    } catch (error) {
      console.error(error);
      return res.send(
        service.prepareResponse(
          StatusCode.INTERNAL_SERVER_ERROR,
          Msg.INTERNAL_SERVER_ERROR
        )
      );
    }
  },

  /**
   * Find a Forum
   *
   * @param {string} req.params.id - The forum's id.
   * @returns forum detail
   */
  findForum: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const searchForum = await forumRepo.findForumById(req.params.id);
      if (!searchForum) {
        return res.send(
          service.prepareResponse(StatusCode.NOT_FOUND, Msg.FORUM_NOT_FOUND)
        );
      }
      return res.send(
        service.prepareResponse(StatusCode.SUCCESS, Msg.SUCCESS, {
          id: searchForum.id,
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
   * Get Forum list
   *
   * @returns forum list detail
   */
  forumList: async function (req, res) {
    try {
      const detail = {
        page: req.query.page || 1,
        searchTerm: req.query.searchTerm,
        limit: 20,
      };

      const { forumList, totalForums } = await forumRepo.forumList(
        detail.searchTerm,
        detail.page
      );
      const totalPage = Math.ceil(totalForums / detail.limit);

      const response = {
        totalForums: totalForums,
        forumPerPage: detail.limit,
        totalPage: totalPage,
        searchTerm: detail.searchTerm,
        forumList: forumList,
      };

      return res.send(
        service.prepareResponse(StatusCode.SUCCESS, Msg.SUCCESS, response)
      );
    } catch (error) {
      console.error("The error; " + error);
      return res.send(
        service.prepareResponse(
          StatusCode.INTERNAL_SERVER_ERROR,
          Msg.INTERNAL_SERVER_ERROR
        )
      );
    }
  },

  /**
   * Update a Forum
   *
   * @param {string} req.params.id - The forum's id.
   * @param {string} req.body.name - The forum's name.
   * @param {string} req.body.description - The description of forum.
   * @param {string} req.body.categoryId - The category id of forum.
   * @param {string} req.body.createdBy - The creator of the forum.
   * @param {string} req.body.moderators - The moderators of the forum.
   * @param {string} req.body.rules - The rules of forums.
   * @param {string} req.body.logoUrl - The url of logo. m.
   * @returns forum update detail
   */
  updateForum: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const forumId = req.params.id;
      const detail = {
        name: req.body.name,
        description: req.body.description,
        categoryId: req.body.categoryId,
        createdBy: req.body.createdBy,
        moderators: req.body.moderators,
        rules: req.body.rules,
        logoUrl: req.body.logoUrl,
      };

      const nameChange = req.body.name;
      if (nameChange) {
        return res.send(
          service.prepareResponse(
            StatusCode.BAD_REQUEST,
            Msg.FORUM_NAME_CANNOT_CHANGE
          )
        );
      }
      const forumCreator = req.body.createdBy;
      if (forumCreator) {
        return res.send(
          service.prepareResponse(
            StatusCode.BAD_REQUEST,
            Msg.FORUM_CREATOR_CANNOT_CHANGE
          )
        );
      }

      const updateForum = await forumRepo.updateForum(forumId, detail);
      if (!updateForum) {
        return res.send(
          service.prepareResponse(StatusCode.NOT_FOUND, Msg.FORUM_NOT_FOUND)
        );
      }
      return res.send(
        service.prepareResponse(StatusCode.SUCCESS, Msg.FORUM_UPDATED)
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
   * Delete a Forum
   *
   * @param {string} req.params.id - The forum's id.
   * @returns forum delete detail
   */
  deleteForum: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const forumId = req.params.id;
      const deleteForum = await forumRepo.deleteForum(forumId);
      if (!deleteForum) {
        return res.send(
          service.prepareResponse(StatusCode.NOT_FOUND, Msg.FORUM_NOT_FOUND)
        );
      }
      return res.send(
        service.prepareResponse(StatusCode.SUCCESS, Msg.FORUM_DELETED)
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
