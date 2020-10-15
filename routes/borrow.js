"use strict";

const express = require("express");
const nodemailer = require("nodemailer");
const Borrow = require("../models/borrow");
const Thing = require("../models/thing");
const User = require("../models/user");

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

const borrowRouter = new express.Router();

borrowRouter.get("/my", async (req, res, next) => {
  try {
    const lends = await Borrow.find({
      lender: req.user._id,
      closed: false
    })
      .populate("borrower", "-passwordHash")
      .populate("thing");
    const borrows = await Borrow.find({
      borrower: req.user._id,
      closed: false
    })
      .populate("lender", "-passwordHash")
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
      .populate("borrower", "-passwordHash")
      .populate("thing");
    const borrows = await Borrow.find({
      borrower: req.user._id,
      closed: true
    })
      .populate("lender", "-passwordHash")
      .populate("thing");
    res.json({ lends, borrows });
  } catch (error) {
    next(error);
  }
});

borrowRouter.post("/create", async (req, res, next) => {
  const { thing } = req.body;
  try {
    const borrower = await User.findById(req.user._id);
    const lender = await User.findById(thing.owner);
    Borrow.create({
      lender: lender._id,
      borrower: borrower._id,
      thing
    });
    transport.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: lender.email,
      subject: "Someone asked to borrow your thing - a message from borrowly",
      text: `${req.user.name} has asked to borrow your ${thing.name}, sign-in to borrowly to respond.`
    });
    res.json({ created: true });
  } catch (error) {
    next(error);
  }
});

borrowRouter.patch("/approve", async (req, res, next) => {
  //this route can be improved, await each update and then send only the populated "lend" back
  //need more data from front end to do so, so I'm not grabbing data from lend.
  try {
    const borrowId = req.body.id;
    const lend = await Borrow.findByIdAndUpdate(borrowId, { active: true }, { new: true })
      .populate("lender", "-passwordHash")
      .populate("borrower", "-passwordHash")
      .populate("thing");
    const lender = await User.findByIdAndUpdate(req.user._id, { $inc: { favors: 1 } }, { new: true });
    const thingId = lend.thing._id;
    const borrowerId = lend.borrower._id;
    const borrower = await User.findByIdAndUpdate(borrowerId, { $inc: { favors: -1 } });
    Thing.findByIdAndUpdate(thingId, { available: false });
    transport.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: borrower.email,
      subject: "Your borrow was approved - a message from borrowly",
      text: `${req.user.name} approved your borrow of ${lend.thing.name}, contact them at ${req.user.email} to arrange pickup.`
    });
    res.json({ lend, lender });
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
