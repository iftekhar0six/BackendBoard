"use strict";

const categories = require("../models/categoryModel");

/**
 * function used to find document using filter
 *
 * @param {object} filter
 * @returns single object using filter
 */
async function getDetail(filter) {
  const getDetail = await categories.findOne(filter);
  return getDetail;
}

/**
 * function to create category
 *
 * @param {object} categoryInfo
 * @returns created category
 */
async function createCategory(categoryInfo) {
  const newCategory = new categories(categoryInfo);
  const savedCategory = await newCategory.save();
  return savedCategory;
}

/**
 * function to get category list
 *
 * @returns category list
 */
async function categoryList() {
  const categoryList = await categories.find();
  return categoryList;
}

/**
 * function for updating category
 *
 * @param {string} categoryId
 * @param {object} categoryInfo
 * @returns updated category
 */
async function updateCategory(categoryId, categoryInfo) {
  const updateCategory = await categories.findByIdAndUpdate(
    categoryId,
    categoryInfo,
    { new: true }
  );
  return updateCategory;
}

/**
 * function to delete category
 *
 * @param {string} categoryId
 * @returns deleted category
 */
async function deleteCategory(categoryId) {
  const deleteCategory = await categories.findByIdAndDelete(categoryId);
  return deleteCategory;
}

module.exports = {
  getDetail: getDetail,
  createCategory: createCategory,
  categoryList: categoryList,
  updateCategory: updateCategory,
  deleteCategory: deleteCategory,
};
