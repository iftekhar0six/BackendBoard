"use strict";

const forums = require("../models/forumModel");

/**
 * function for filtering
 *
 * @param {object} filter
 * @returns
 */
async function getDetail(filter) {
  const getDetail = await forums.findOne(filter);
  return getDetail;
}

/**
 * function for creating new forum
 *
 * @param {object} forumInfo
 * @returns
 */
async function createForum(forumInfo) {
  const newForum = new forums(forumInfo);
  const savedForum = newForum.save();
  return savedForum;
}

/**
 * function to find forum by id
 *
 * @param {string} forumId
 * @returns
 */
async function findForumById(forumId) {
  const targetForum = await forums.findById(forumId);
  return targetForum;
}

/**
 * function to get forum list
 *
 * @param {number} page - Page number
 * @returns array of forum
 */
async function forumList(searchTerm, page) {
  const limit = 20;
  const skip = (page - 1) * limit;
  let query = {};

  if (searchTerm) {
    query = {
      $or: [{ name: { $regex: searchTerm } }],
    };
  }
  console.log("searchTerm: " + searchTerm);
  const forumList = await forums.find(query).skip(skip).limit(limit).lean();
  const totalForums = await forums.countDocuments(query);
  // console.log("forumList: " + forumList);
  console.log("totalForums: " + totalForums);
  return { forumList, totalForums };
}

/**
 * function for updating forum
 *
 * @param {string} forumId
 * @param {object} forumInfo
 * @returns
 */
async function updateForum(forumId, forumInfo) {
  const updatedForum = await forums.findByIdAndUpdate(forumId, forumInfo);
  return updatedForum;
}

/**
 * function to delete forum
 *
 * @param {string} forumId
 * @returns
 */
async function deleteForum(forumId) {
  const deletedForum = await forums.findByIdAndDelete(forumId);
  return deletedForum;
}

module.exports = {
  getDetail: getDetail,
  createForum: createForum,
  findForumById: findForumById,
  forumList: forumList,
  updateForum: updateForum,
  deleteForum: deleteForum,
};
