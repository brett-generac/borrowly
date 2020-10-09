"use strict";

const { Router } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const router = new Router();

router.post("/sign-up", (req, res, next) => {
  const { name, email, password } = req.body;
  bcryptjs
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        name,
        email,
        passwordHash: hash
      });
    })
    .then((user) => {
      req.session.user = user._id;
      res.json({ user });
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/sign-in", (req, res, next) => {
  let user;
  const { email, password } = req.body;
  User.findOne({ email })
    .then((document) => {
      if (!document) {
        throw new Error("No user found with that email.");
      } else {
        user = document;
        return bcryptjs.compare(password, user.passwordHash);
      }
    })
    .then((result) => {
      if (result) {
        req.session.user = user._id;
        res.json({ user });
      } else {
        throw new Error("Wrong password.");
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/sign-out", (req, res) => {
  req.session.destroy();
  res.json({ signedOut: true });
});

module.exports = router;
