"use strict";

const userRepo = require("../data_access/userData");
const service = require("../helpers/service");
const { Msg, StatusCode } = require("../errors/code");

module.exports = {
  /**
   * Register an User
   *
   * @param {string} req.body.userName - The User's username.
   * @param {string} req.body.firstName - The User's first name.
   * @param {string} req.body.lastName - The User's last name.
   * @param {string} req.body.gender - The User's gender.
   * @param {string} req.body.email - The User's email address.
   * @param {string} req.body.password - The User's password.
   * @param {number} req.body.mobileNumber - The User's mobile number.
   * @param {string} req.body.address - The User's role.
   * @returns User register detail
   */
  registerUser: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const detail = {
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        email: req.body.email,
        password: await service.bcryptPassword(req.body.password),
        mobileNumber: req.body.mobileNumber,
        address: req.body.address,
      };

      const existMail = await userRepo.getDetail({ email: detail.email });
      if (existMail) {
        return res.send(
          service.prepareResponse(
            StatusCode.ALREADY_EXIST,
            Msg.USER_EMAIL_EXISTS
          )
        );
      }
      const existMobileNumber = await userRepo.getDetail({
        mobileNumber: detail.mobileNumber,
      });
      if (existMobileNumber) {
        return res.send(
          service.prepareResponse(
            StatusCode.ALREADY_EXIST,
            Msg.USER_PHONE_EXISTS
          )
        );
      }

      req.body.password = detail.password;
      const createUser = await userRepo.create(detail);

      if (!createUser) {
        return res.send(
          service.prepareResponse(
            StatusCode.INTERNAL_SERVER_ERROR,
            Msg.USER_NOT_REGISTER
          )
        );
      }
      return res.send(
        service.prepareResponse(StatusCode.SUCCESS, Msg.USER_REGISTER, {
          id: createUser.id,
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
   * Find an User
   *
   * @param {string} req.params.id - The User's id.
   * @returns User profile detail
   */
  userProfile: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const userId = req.params.id;
      const findUser = await userRepo.getById(userId);
      if (!findUser) {
        return res.send(
          service.prepareResponse(StatusCode.NOT_FOUND, Msg.USER_NOT_FOUND)
        );
      }
      return res.send(
        service.prepareResponse(StatusCode.SUCCESS, Msg.SUCCESS, {
          id: findUser.id,
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
   * Find User's list
   *
   * @param {number} req.query.page - Page number.
   * @param {string} req.query.searchTerm - The search term.
   * @returns User's list detail
   */
  userList: async function (req, res) {
    try {
      const detail = {
        page: req.query.page || 1,
        searchTerm: req.query.searchTerm,
        limit: 20,
      };
      const { usersList, totalUsers } = await userRepo.list(
        detail.searchTerm,
        detail.page
      );
      const totalPages = Math.ceil(totalUsers / detail.limit);

      const response = {
        totalUsers: totalUsers,
        totalPages: totalPages,
        currentPage: detail.page,
        usersPerPage: detail.limit,
        searchTerm: detail.searchTerm,
        usersList: usersList,
      };

      return res.send(
        service.prepareResponse(StatusCode.SUCCESS, Msg.SUCCESS, response)
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
   * Update an User
   *
   * @param {string} req.params.id - The User's id.
   * @param {string} req.body.userName - The User's username.
   * @param {string} req.body.firstName - The User's first name.
   * @param {string} req.body.lastName - The User's last name.
   * @param {string} req.body.gender - The User's gender.
   * @param {string} req.body.email - The User's email address.
   * @param {string} req.body.password - The User's password.
   * @param {number} req.body.mobileNumber - The User's mobile number.
   * @param {string} req.body.address - The User's role.
   * @returns User update detail
   */
  updateProfile: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const userId = req.params.id;
      const detail = {
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        email: req.body.email,
        password: await service.bcryptPassword(req.body.password),
        mobileNumber: req.body.mobileNumber,
        address: req.body.address,
      };

      req.body.password = detail.password;
      const updateUser = await userRepo.updateUser(userId, detail);
      if (!updateUser) {
        return res.send(
          service.prepareResponse(StatusCode.NOT_FOUND, Msg.USER_NOT_FOUND)
        );
      }
      return res.send(
        service.prepareResponse(StatusCode.SUCCESS, Msg.SUCCESS, {
          id: updateUser.id,
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
   * Delete an User
   *
   * @param {string} req.params.id - The User's id.
   * @returns User delete detail
   */
  deactivateAccount: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const userId = req.params.id;
      const deletedUser = await userRepo.deleteUser(userId);
      if (!deletedUser) {
        return res.send(
          service.prepareResponse(StatusCode.NOT_FOUND, Msg.USER_NOT_FOUND)
        );
      }
      return res.send(
        service.prepareResponse(StatusCode.SUCCESS, Msg.USER_DELETE)
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
