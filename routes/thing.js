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
      next(error);
    });
});

thingRouter.post("/delete", routeGuard, (req, res, next) => {
  const { id } = req.body;
  Thing.findByIdAndDelete(id)
    .then(() => {
      res.json({ deleted: true });
    })
    .catch((error) => {
      next(error);
    });
});

thingRouter.patch("/:id/edit", routeGuard, upload.single("photo"), (req, res, next) => {
  const id = req.params.id;
  const { category, name, description, photoUrl } = req.body;
  const coordinates = req.body.coordinates.split(",");
  const lng = Number(coordinates[0]);
  const lat = Number(coordinates[1]);
  let url;
  if (req.file) {
    url = req.file.path;
  } else {
    url = photoUrl;
  }
  Thing.findByIdAndUpdate(id, {
    category,
    name,
    description,
    photoUrl: url,
    location: {
      type: "Point",
      coordinates: [lng, lat]
    }
  })
    .then(() => {
      res.json({ edited: true });
    })
    .catch((error) => {
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
      next(error);
    });
});

thingRouter.post("/create", routeGuard, upload.single("photo"), (req, res, next) => {
  const { category, name, description } = req.body;
  const coordinates = req.body.coordinates.split(",");
  const lng = Number(coordinates[0]);
  const lat = Number(coordinates[1]);
  const url = req.file.path;
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
    .then(() => {
      res.json({ created: true });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = thingRouter;
