const threads = require("../models/threadModel");
const threadRepo = require("../data_access/threadData");
const service = require("../helpers/service");
const { StatusCode, Msg } = require("../errors/code");

module.exports = {
  /**
   * Create a Thread
   *
   * @param {string} req.body.forumId - The forum's id.
   * @param {string} req.body.title - The title of thread.
   * @param {string} req.body.content - The content of thread.
   * @param {string} req.body.createdBy - The creator of the thread.
   * @param {string} req.body.tags - The tags of the thread.
   * @returns Thread creating detail
   */
  createThread: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const detail = {
        forumId: req.body.forumId,
        title: req.body.title,
        content: req.body.content,
        createdBy: req.body.createdBy,
        tags: req.body.tags,
      };

      const newThread = await threadRepo.createThread(detail);
      return res.send(
        service.prepareResponse(StatusCode.SUCCESS, Msg.THREAD_CREATED, {
          id: newThread.id,
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
   * Find a Thread
   *
   * @param {string} req.body.id - The id of thread.
   * @returns Thread find detail
   */
  findThread: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const searchThread = await threadRepo.findThreadById(req.params.id);
      if (!searchThread) {
        return res.send(
          service.prepareResponse(StatusCode.NOT_FOUND, Msg.THREAD_NOT_FOUND)
        );
      }
      return res.send(
        service.prepareResponse(StatusCode.SUCCESS, Msg.SUCCESS, {
          id: searchThread.id,
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
   * Get List of Thread's
   *
   * @returns Thread list detail
   */
  threadList: async function (req, res) {
    try {
      await threadRepo.threadList();
      return res.send(service.prepareResponse(StatusCode.SUCCESS, Msg.SUCCESS));
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
   * Update a Thread
   *
   * @param {string} req.params.id - The thread's id.
   * @param {string} req.body.forumId - The forum's id.
   * @param {string} req.body.title - The title of thread.
   * @param {string} req.body.content - The content of thread.
   * @param {string} req.body.createdBy - The creator of the thread.
   * @param {string} req.body.tags - The tags of the thread
   * @returns Thread updating detail
   */
  updateThread: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const threadId = req.params.id;
      const detail = {
        forumId: req.body.forumId,
        title: req.body.title,
        content: req.body.content,
        createdBy: req.body.createdBy,
        tags: req.body.tags,
      };

      const updateThread = await threadRepo.updateThread(threadId, detail);

      if (!updateThread) {
        return res.send(
          service.prepareResponse(StatusCode.NOT_FOUND, Msg.THREAD_NOT_FOUND)
        );
      }
      return res.send(
        service.prepareResponse(StatusCode.SUCCESS, Msg.THREAD_UPDATED)
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
   * Delete a Thread
   *
   * @param {string} req.body.id - The id of thread.
   * @returns Thread deleting detail
   */
  deleteThread: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const threadId = req.params.id;
      const deleteThread = await threadRepo.deleteThread(threadId);
      if (!deleteThread) {
        return res.send(
          service.prepareResponse(StatusCode.NOT_FOUND, Msg.THREAD_NOT_FOUND)
        );
      }
      return res.send(
        service.prepareResponse(StatusCode.SUCCESS, Msg.THREAD_DELETED)
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
