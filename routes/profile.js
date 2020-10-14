"use strict";

const express = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const routeGuard = require("../middleware/route-guard");
const { NotExtended } = require("http-errors");

const profileRouter = new express.Router();

profileRouter.get("/me", (req, res) => {
  const user = req.user;
  res.json({ user });
});

profileRouter.patch("/me", routeGuard, async (req, res, next) => {
  const { name, email, password } = req.body;
  if (password) {
    try {
      const hash = await bcryptjs.hash(req.body.password, 10);
      const user = await User.findByIdAndUpdate(req.user._id, { passwordHash: hash });
    } catch (error) {
      next(error);
    }
  }
  try {
    const user = await User.findByIdAndUpdate(req.user._id, { name, email }, { new: true }).select("-password");
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

module.exports = profileRouter;
