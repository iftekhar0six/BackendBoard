"use strict";

const admins = require("../models/adminModel");

/**
 * function used for filtering
 *
 * @param {String} filter
 * @return single document using filter
 */
async function getDetail(filter) {
  const getDetail = await admins.findOne(filter).exec();
  return getDetail;
}

/**
 * function used to create admin
 *
 * @param {object} adminInfo
 * @return create admin
 */
async function create(adminInfo) {
  const newAdmin = new admins(adminInfo);
  const savedAdmin = await newAdmin.save();
  return savedAdmin;
}

/**
 * function used to find admin profile
 *
 * @param {string} searchTerm - Search term to filter admins
 * @param {number} page - Page number
 * @param {string} adminId
 * @return
 */
async function findAdmin(adminId) {
  const findAdmin = await admins.findById(adminId);
  return findAdmin;
}

/**
 * function used to have list of all admins and search by email
 *
 * @param {number} page - Page number
 * @returns array of admins
 */
async function list(searchTerm, page = 1) {
  try {
    const limit = 20;
    const skip = (page - 1) * limit;
    let query = {};

    if (searchTerm) {
      query = {
        $or: [{ email: { $regex: searchTerm } }],
      };
    }
    const adminList = await admins.find(query).skip(skip).limit(limit).lean();
    const totalAdmins = await admins.countDocuments(query);

    return { adminList, totalAdmins };
  } catch (error) {
    throw new Error(`Error fetching users list: ${error.message}`);
  }
}

/**
 * function for updating an admin profile
 *
 * @param {string} adminId `
 * @param {object} adminInfo
 * @returns
 */
async function updateAdmin(adminId, adminInfo) {
  const updatedAdmin = await admins.findByIdAndUpdate(adminId, adminInfo);
  return updatedAdmin;
}

/**
 * function for deactivating admin profile
 *
 * @param {string} adminId `
 * @returns
 */
async function deleteAdmin(adminId) {
  const deletedAdmin = await admins.findByIdAndDelete(adminId);
  return deletedAdmin;
}

module.exports = {
  getDetail: getDetail,
  create: create,
  findAdmin: findAdmin,
  list: list,
  updateAdmin: updateAdmin,
  deleteAdmin: deleteAdmin,
};
