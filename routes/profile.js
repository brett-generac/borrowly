"use strict";

const express = require("express");
const User = require("../models/user");
const routeGuard = require("../middleware/route-guard");

const profileRouter = new express.Router();

profileRouter.get("/me", (req, res) => {
  const user = req.user;
  res.json({ user });
});

profileRouter.patch("/me", routeGuard, async (req, res) => {
  console.log(req.body);
  //update route needs completing
  const user = await User.findByIdAndUpdate({});
});

module.exports = profileRouter;
