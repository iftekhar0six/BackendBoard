"use strict";

const bcrypt = require("bcryptjs");
const service = require("../helpers/service");
const { StatusCode, Msg } = require("../errors/code");
const adminRepo = require("../data_access/adminData");

module.exports = {
  /**
   * Register an Admin
   *
   * @param {string} req.body.firstName - The admin's first name.
   * @param {string} req.body.lastName - The admin's last name.
   * @param {string} req.body.email - The admin's email address.
   * @param {string} req.body.password - The admin's password.
   * @param {string} req.body.mobileNumber - The admin's mobile number.
   * @param {string} req.body.gender - The admin's gender.
   * @param {string} req.body.role - The admin's role.
   * @returns Admin register detail
   */
  registerAdmin: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const detail = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: await service.bcryptPassword(req.body.password),
        mobileNumber: req.body.mobileNumber,
        gender: req.body.gender,
        role: req.body.role,
      };

      const existMail = await adminRepo.getDetail({ email: detail.email });
      if (existMail) {
        return res.send(
          service.prepareResponse(
            StatusCode.ALREADY_EXIST,
            Msg.ADMIN_MAIL_EXIST
          )
        );
      }
      const existMobile = await adminRepo.getDetail({
        mobileNumber: detail.mobileNumber,
      });
      if (existMobile) {
        return res.send(
          service.prepareResponse(
            StatusCode.ALREADY_EXIST,
            Msg.ADMIN_PHONE_EXIST
          )
        );
      }

      req.body.password = detail.password;
      const newAdmin = await adminRepo.create(detail);
      if (!newAdmin) {
        return res.send(
          service.prepareResponse(
            StatusCode.INTERNAL_SERVER_ERROR,
            Msg.ADMIN_NOT_REGISTER
          )
        );
      }
      return res.send(
        service.prepareResponse(StatusCode.SUCCESS, Msg.ADMIN_REGISTER, {
          id: newAdmin.id,
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
   * Get Admin profile
   *
   * @param {Object} req.params - The request parameters.
   * @param {string} req.params.id - The admin ID.
   * @returns Admin profile
   */
  adminProfile: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const adminId = req.params.id;
      const findAdmin = await adminRepo.findAdmin(adminId);

      if (!findAdmin) {
        return res.send(
          service.prepareResponse(StatusCode.NOT_FOUND, Msg.ADMIN_NOT_FOUND)
        );
      }
      return res.send(
        service.prepareResponse(StatusCode.SUCCESS, Msg.SUCCESS, {
          id: findAdmin.id,
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
   * Get list of all Admins
   *
   * @param {number} req.query.page - Page number.
   * @param {string} req.query.searchTerm - The search term.
   * @returns Admin list
   */
  adminList: async function (req, res) {
    try {
      const detail = {
        page: req.query.page || 1,
        searchTerm: req.query.searchTerm,
        limit: 20,
      };

      const { adminList, totalAdmins } = await adminRepo.list(
        detail.searchTerm,
        detail.page
      );
      const totalPage = Math.ceil(totalAdmins / detail.limit);

      const response = {
        totalAdmins: totalAdmins,
        adminPerPage: detail.limit,
        totalPage: totalPage,
        searchTerm: detail.searchTerm,
        adminList: adminList,
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
   * Update an Admin profile
   *
   * @param {string} req.params.id - The admin's id.
   * @param {string} req.body.firstName - The admin's first name.
   * @param {string} req.body.lastName - The admin's last name.
   * @param {string} req.body.email - The admin's email address.
   * @param {string} req.body.password - The admin's password.
   * @param {string} req.body.mobileNumber - The admin's mobile number.
   * @param {string} req.body.gender - The admin's gender.
   * @param {string} req.body.role - The admin's role.
   * @returns Update admin profile
   */
  updateAdminProfile: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const adminId = req.params.id;
      const detail = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: await service.bcryptPassword(req.body.password),
        mobileNumber: req.body.mobileNumber,
        gender: req.body.gender,
        role: req.body.role,
      };

      req.body.password = detail.password;
      const updatedAdmin = await adminRepo.updateAdmin(adminId, detail);
      if (!updatedAdmin) {
        return res.send(
          service.prepareResponse(StatusCode.NOT_FOUND, Msg.ADMIN_NOT_FOUND)
        );
      }
      return res.send(
        service.prepareResponse(StatusCode.SUCCESS, Msg.ADMIN_UPDATED, {
          id: updatedAdmin.id,
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
   * Deactivate Admin profile
   *
   * @param {string} req.params.id - The admin ID.
   * @returns Delete admin detail
   */
  deactivateAdmin: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const deletedAdmin = await adminRepo.deleteAdmin(req.params.id);
      if (!deletedAdmin) {
        return res.send(
          service.prepareResponse(StatusCode.NOT_FOUND, Msg.ADMIN_NOT_FOUND)
        );
      }
      return res.send(
        service.prepareResponse(StatusCode.SUCCESS, Msg.ADMIN_DELETED, {
          id: deletedAdmin.id,
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
};
