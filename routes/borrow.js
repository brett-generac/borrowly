"use strict";

const express = require("express");
const Borrow = require("../models/borrow");

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
        borrower: req.user._id
      })
        .populate("lender")
        .populate("thing");
    })
    .then((documents) => {
      borrows = documents;
      res.json({ lends, borrows });
    })
    .catch((error) => {
      console.log(error);
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
      console.log(error);
      next(error);
    });
});

borrowRouter.post("/create", (req, res, next) => {
  const { lender, thing } = req.body;
  Borrow.create({
    lender,
    borrower: req.user._id,
    thing
  })
    .then((document) => {
      res.json({ document });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

borrowRouter.patch("/approve", (req, res, next) => {
  const { id } = req.body;
  Borrow.findByIdAndUpdate(id, { active: true }, { new: true })
    .populate("lender")
    .populate("borrower")
    .populate("thing")
    .then((lend) => {
      res.json({ lend });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

borrowRouter.patch("/end", (req, res, next) => {
  const { id } = req.body;
  Borrow.findByIdAndUpdate(id, { active: false, closed: true })
    .then((lend) => {
      res.json({ lend });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

module.exports = borrowRouter;
