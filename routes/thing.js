"use strict";

const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary");
const multerStorageCloudinary = require("multer-storage-cloudinary");
const Thing = require("../models/thing");
const routeGuard = require("../middleware/route-guard");

const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary.v2
});
const upload = multer({ storage });

const thingRouter = new express.Router();

thingRouter.get("/my", routeGuard, (req, res, next) => {
  Thing.find({ owner: req.user._id })
    .then((things) => {
      res.json({ things });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

thingRouter.get("/list", (req, res, next) => {
  const { coordinates, category } = req.query;
  const lng = coordinates[0];
  const lat = coordinates[1];
  let categoryObject = {};
  if (category) {
    categoryObject = {
      category
    };
  }
  Thing.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat]
        },
        $maxDistance: 15000
      }
    }
  })
    .find(categoryObject)
    .find({ available: true })
    .then((things) => {
      res.json({ things });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

thingRouter.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Thing.findById(id)
    .populate("owner")
    .then((thing) => {
      res.json({ thing });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

thingRouter.post("/create", routeGuard, upload.single("photo"), (req, res, next) => {
  const url = req.file.path;
  const { category, name, description } = req.body;
  const coordinates = req.body.coordinates.split(",");
  const lng = Number(coordinates[0]);
  const lat = Number(coordinates[1]);
  Thing.create({
    owner: req.user._id,
    category,
    name,
    description,
    photoUrl: url,
    location: {
      coordinates: [lng, lat]
    }
  })
    .then((document) => {
      res.json({ document });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

thingRouter.delete("/:id", routeGuard, (req, res, next) => {
  const id = req.body;
  Thing.findOneAndDelete({ _id: id })
    .then(() => {
      res.json({});
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

module.exports = thingRouter;
