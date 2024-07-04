const posts = require("../models/postModel");
const { post } = require("../routes/userRoute");

/**
 * function to create post
 *
 * @param {object} postInfo
 * @returns
 */
async function createPost(postInfo) {
  const newPost = new posts(postInfo);
  const savedPost = await newPost.save();
  return savedPost;
}

/**
 * function to find post
 *
 * @param {string} postId
 * @returns
 */
async function findPostById(postId) {
  const targetPost = await posts.findById(postId);
  return targetPost;
}

/**
 * function to get post list
 *
 * @param {number} page - Page number
 * @returns array of posts
 */
async function postList(page = 1) {
  const limit = 20;
  const skip = (page - 1) * limit;
  const postList = await posts.find().skip(skip).limit(limit);
  return postList;
}

/**
 * function to update post
 *
 * @param {string} postId
 * @param {object} postInfo
 * @returns
 */
async function updatePost(postId, postInfo) {
  const updatedPost = await posts.findByIdAndUpdate(postId, postInfo, {
    new: true,
  });
  return updatedPost;
}

/**
 * function to delete post
 *
 * @param {string} postId
 * @returns
 */
async function deletePost(postId) {
  const deletedPost = await posts.findByIdAndDelete(postId);
  return deletedPost;
}

module.exports = {
  createPost: createPost,
  findPostById: findPostById,
  postList: postList,
  updatePost: updatePost,
  deletePost: deletePost,
};
