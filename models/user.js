"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String
  },
  favors: {
    type: Number,
    default: 1,
    min: 0
  }
});

module.exports = mongoose.model("User", schema);
