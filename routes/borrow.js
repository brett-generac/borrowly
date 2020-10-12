"use strict";

const express = require("express");
const Borrow = require("../models/borrow");
const Thing = require("../models/thing");
const User = require("../models/user");

const borrowRouter = new express.Router();

borrowRouter.get("/my", async (req, res, next) => {
  try {
    const lends = await Borrow.find({
      lender: req.user._id,
      closed: false
    })
      .populate("borrower")
      .populate("thing");
    const borrows = await Borrow.find({
      borrower: req.user._id,
      closed: false
    })
      .populate("lender")
      .populate("thing");
    res.json({ lends, borrows });
  } catch (error) {
    next(error);
  }
});

borrowRouter.get("/history", async (req, res, next) => {
  try {
    const lends = await Borrow.find({
      lender: req.user._id,
      closed: true
    })
      .populate("borrower")
      .populate("thing");
    const borrows = await Borrow.find({
      borrower: req.user._id,
      closed: true
    })
      .populate("lender")
      .populate("thing");
    res.json({ lends, borrows });
  } catch (error) {
    next(error);
  }
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

borrowRouter.patch("/approve", async (req, res, next) => {
  try {
    const borrowId = req.body.id;
    const lend = await Borrow.findByIdAndUpdate(borrowId, { active: true }, { new: true })
      .populate("lender")
      .populate("borrower")
      .populate("thing");
    const lender = await User.findByIdAndUpdate(req.user._id, { $inc: { favors: 1 } }, { new: true });
    const thingId = lend.thing._id;
    const borrowerId = lend.borrower._id;
    const thing = Thing.findByIdAndUpdate(thingId, { available: false });
    const borrower = User.findByIdAndUpdate(borrowerId, { $inc: { favors: -1 } });
    res.json({ lend, lender });
    await Promise.all([thing, borrower]);
  } catch (error) {
    next(error);
  }
});

borrowRouter.patch("/end", async (req, res, next) => {
  try {
    const borrowId = req.body.id;
    const lend = await Borrow.findByIdAndUpdate(borrowId, { active: false, closed: true });
    const thingId = lend.thing._id;
    res.json({ lend });
    await Thing.findByIdAndUpdate(thingId, { available: true });
  } catch (error) {
    next(error);
  }
});

module.exports = borrowRouter;
