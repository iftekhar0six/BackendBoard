const threads = require("../models/threadModel");

/**
 * function for filtering
 *
 * @param {object} filter
 * @returns
 */
async function getDetail(filter) {
  const getDetail = await threads.findOne(filter);
  return getDetail;
}

/**
 * function for creating a new thread
 *
 * @param {object} threadInfo
 * @returns
 */
async function createThread(threadInfo) {
  const newThread = new threads(threadInfo);
  const savedThread = await newThread.save();
  return savedThread;
}

/**
 * function to find thread by id
 *
 * @param {string} threadId
 * @returns
 */
async function findThreadById(threadId) {
  const targetThread = await threads.findById(threadId);
  return targetThread;
}

/**
 * function to get thread list
 *
 * @param {number} page - Page number
 * @returns array of threads
 */
async function threadList(page = 1) {
  const limit = 20;
  const skip = (page - 1) * limit;
  const threadList = await threads.find().skip(skip).limit(limit);
  return threadList;
}

/**
 * function for updating thread
 *
 * @param {string} threadId
 * @param {object} threadInfo
 * @returns
 */
async function updateThread(threadId, threadInfo) {
  const updatedThread = await threads.findByIdAndUpdate(threadId, threadInfo, {
    new: true,
  });
  return updatedThread;
}

/**
 * function to delete thread
 *
 * @param {string} threadId
 * @returns
 */
async function deleteThread(threadId) {
  const deletedThread = await threads.findByIdAndDelete(threadId);
  return deletedThread;
}

module.exports = {
  getDetail: getDetail,
  createThread: createThread,
  findThreadById: findThreadById,
  threadList: threadList,
  updateThread: updateThread,
  deleteThread: deleteThread,
};
