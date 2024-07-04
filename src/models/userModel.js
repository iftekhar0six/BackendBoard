"use strict";

const mongoose = require("mongoose");
const { Status, Type } = require("../helpers/enum");

const userSchema = new mongoose.Schema(
  {
    type: {
      type: Number,
      enum: [Type.ADMIN, Type.USER],
      default: Type.USER,
    },
    userName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    isReported: {
      type: Boolean,
      default: true,
    },
    status: {
      type: Number,
      required: true,
      enum: [Status.Active, Status.Inactive],
      default: Status.Active,
    },
    createdAt: {
      type: Number,
      default: Date.now,
    },
    updatedAt: {
      type: Number,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
