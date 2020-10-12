"use strict";

const { Router } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const router = new Router();

router.post("/sign-up", async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const hash = await bcryptjs.hash(password, 10);
    const user = await User.create({
      name,
      email,
      passwordHash: hash
    });
    req.session.user = user._id;
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

router.post("/sign-in", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("No user found with that email.");
    const result = await bcryptjs.compare(password, user.passwordHash);
    if (!result) throw new Error("Wrong password.");
    req.session.user = user._id;
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

router.post("/sign-out", (req, res) => {
  req.session.destroy();
  res.json({ signedOut: true });
});

module.exports = router;
