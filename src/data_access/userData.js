"use strict";

const users = require("../models/userModel");

/**
 * function to get one document using filter
 *
 * @param {object} filter
 * @returns single document
 */
async function getDetail(filter) {
  const detail = await users.findOne(filter).exec();
  return detail;
}

/**
 * function for creating an user
 *
 * @param {object} userInfo User's detail
 * @returns create document of user
 */
async function create(userInfo) {
  const newUser = new users(userInfo);
  const savedUser = await newUser.save();
  return savedUser;
}

/**
 * function to find user by id
 *
 * @param {string} userId User's id
 * @returns single user's profile
 */
async function getById(userId) {
  const targetUser = await users.findById(userId);
  return targetUser;
}

/**
 * function to get list of all users and search them by userName and email
 *
 * @param {string} searchTerm - Search term to filter users
 * @param {number} page - Page number
 * @returns array of users
 */
async function list(searchTerm, page = 1) {
  try {
    const limit = 20;
    const skip = (page - 1) * limit;
    let query = {};

    if (searchTerm) {
      query = {
        $or: [
          { userName: { $regex: searchTerm } },
          { email: { $regex: searchTerm } },
        ],
      };
    }
    const usersList = await users.find(query).skip(skip).limit(limit).lean();
    const totalUsers = await users.countDocuments(query);

    return { usersList, totalUsers };
  } catch (error) {
    throw new Error(`Error fetching users list: ${error.message}`);
  }
}

/**
 * function to update an user profile
 *
 * @param {string} userId User's id
 * @param {object} userInfo User detail
 * @returns updated user profile
 */
async function updateUser(userId, userInfo) {
  const updatedUser = await users.findByIdAndUpdate(userId, userInfo, {
    new: true,
  });
  return updatedUser;
}

/**
 * function to delete an user profile
 *
 * @param {string} userId User's id
 * @returns deleted user profile
 */
async function deleteUser(userId) {
  const deletedUser = await users.findByIdAndDelete(userId);
  return deletedUser;
}

module.exports = {
  getDetail: getDetail,
  create: create,
  getById: getById,
  list: list,
  updateUser: updateUser,
  deleteUser: deleteUser,
};
