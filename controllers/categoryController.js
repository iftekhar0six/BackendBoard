"use strict";

const categories = require("../models/categoryModel");
const categoryRepo = require("../data_access/categoryData");
const service = require("../helpers/service");
const { StatusCode, Msg } = require("../errors/code");

module.exports = {
  /**
   * Create a category
   *
   * @param {string} req.body.createdBy - The category name.
   * @param {string} req.body.categoryName - The category name.
   * @param {string} req.body.description - The category description.
   * @returns category create detail
   */
  createCategory: async function (req, res) {
    try {
      const detail = {
        createdBy: req.body.createdBy,
        categoryName: req.body.categoryName,
        description: req.body.description,
      };

      const existCategory = await categoryRepo.getDetail({
        categoryName: detail.categoryName,
      });
      if (!existCategory) {
        const newCategory = await categoryRepo.createCategory(detail);
        return res.send(
          service.prepareResponse(StatusCode.SUCCESS, Msg.CATEGORY_CREATED, {
            id: newCategory.id,
          })
        );
      }
      return res.send(
        service.prepareResponse(
          StatusCode.ALREADY_EXIST,
          Msg.CATEGORY_NAME_EXIST
        )
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
   * Find a category
   *
   * @param {string} req.params.id - The category id.
   * @returns category detail
   */
  findCategory: async function (req, res) {
    try {
      const detail = { categoryId: req.params.id };
      const findCategory = await categoryRepo.getDetail({
        _id: detail.categoryId,
      });
      if (!findCategory) {
        return res.send(
          service.prepareResponse(StatusCode.NOT_FOUND, Msg.CATEGORY_NOT_FOUND)
        );
      }
      return res.send(
        service.prepareResponse(StatusCode.SUCCESS, Msg.SUCCESS, {
          id: findCategory.id,
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
   * Get a list of category
   *
   * @returns category list
   */
  categoryList: async function (req, res) {
    try {
      const getCategoryList = await categoryRepo.categoryList();
      return res.send(getCategoryList);
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
   * Update a category
   *
   * @param {string} req.params.id - The category id.
   * @param {string} req.body.createdBy - The category name.
   * @param {string} req.body.categoryName - The category name.
   * @param {string} req.body.description - The category description.
   * @returns category update detail
   */
  updateCategory: async function (req, res) {
    try {
      const categoryId = req.params.id;
      const detail = {
        createdBy: req.body.createdBy,
        categoryName: req.body.categoryName,
        description: req.body.description,
      };
      const existCategory = await categoryRepo.getDetail({
        categoryName: detail.categoryName,
      });
      if (!existCategory) {
        const updatedCategory = await categoryRepo.updateCategory(
          categoryId,
          detail
        );
        if (!updatedCategory) {
          return res.send(
            service.prepareResponse(
              StatusCode.NOT_FOUND,
              Msg.CATEGORY_NOT_FOUND
            )
          );
        }
        detail.isEdited = true;
        return res.send(
          service.prepareResponse(StatusCode.SUCCESS, Msg.CATEGORY_UPDATED, {
            id: updatedCategory.id,
          })
        );
      }
      return res.send(
        service.prepareResponse(
          StatusCode.BAD_REQUEST,
          Msg.CATEGORY_NAME_CANNOT_CHANGE
        )
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
   * Delete a category
   *
   * @param {string} req.params.id - The category id.
   * @returns category delete detail
   */
  deleteCategory: async function (req, res) {
    try {
      const detail = { categoryId: req.params.id };
      const deleteCategory = await categoryRepo.deleteCategory(
        detail.categoryId
      );
      if (!deleteCategory) {
        return res.send(
          service.prepareResponse(StatusCode.NOT_FOUND, Msg.CATEGORY_NOT_FOUND)
        );
      }
      return res.send(
        service.prepareResponse(StatusCode.SUCCESS, Msg.CATEGORY_DELETED)
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
