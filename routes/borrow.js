"use strict";

const express = require("express");
const Borrow = require("../models/borrow");
const Thing = require("../models/thing");
const User = require("../models/user");

const borrowRouter = new express.Router();

borrowRouter.get("/my", (req, res, next) => {
  let lends;
  let borrows;
  Borrow.find({
    lender: req.user._id,
    closed: false
  })
    .populate("borrower")
    .populate("thing")
    .then((documents) => {
      lends = documents;
      return Borrow.find({
        borrower: req.user._id,
        closed: false
      })
        .populate("lender")
        .populate("thing");
    })
    .then((documents) => {
      borrows = documents;
      res.json({ lends, borrows });
    })
    .catch((error) => {
      next(error);
    });
});

borrowRouter.get("/history", (req, res, next) => {
  let lends;
  let borrows;
  Borrow.find({
    lender: req.user._id,
    closed: true
  })
    .populate("borrower")
    .populate("thing")
    .then((documents) => {
      lends = documents;
      return Borrow.find({
        borrower: req.user._id,
        closed: true
      })
        .populate("lender")
        .populate("thing");
    })
    .then((documents) => {
      borrows = documents;
      res.json({ lends, borrows });
    })
    .catch((error) => {
      next(error);
    });
});

borrowRouter.post("/create", async (req, res, next) => {
  const { lender, thing } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (user.favors >= 1) {
      Borrow.create({
        lender,
        borrower: req.user._id,
        thing
      });
      res.json({ created: true });
    }
  } catch (error) {
    next(error);
  }
});

borrowRouter.patch("/approve", (req, res, next) => {
  let lend;
  const borrowId = req.body.id;
  console.log("la la al la ", borrowId);
  Borrow.findByIdAndUpdate(borrowId, { active: true }, { new: true })
    .populate("lender")
    .populate("borrower")
    .populate("thing")
    .then((document) => {
      lend = document;
      const thingId = lend.thing._id;
      return Thing.findByIdAndUpdate(thingId, { available: false });
    })
    .then(() => {
      const borrowerId = lend.borrower._id;
      return User.findByIdAndUpdate(borrowerId, { $inc: { favors: -1 } });
    })
    .then(() => {
      return User.findByIdAndUpdate(req.user._id, { $inc: { favors: 1 } }, { new: true });
    })
    .then((lender) => {
      res.json({ lend, lender });
    })
    .catch((error) => {
      next(error);
    });
});

borrowRouter.patch("/end", (req, res, next) => {
  let lend;
  const borrowId = req.body.id;
  Borrow.findByIdAndUpdate(borrowId, { active: false, closed: true })
    .then((document) => {
      lend = document;
      const thingId = lend.thing._id;
      return Thing.findByIdAndUpdate(thingId, { available: true });
    })
    .then(() => {
      res.json({ lend });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = borrowRouter;
