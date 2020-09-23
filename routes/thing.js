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

thingRouter.get("/list", (req, res, next) => {
  const { coordinates, category } = req.query;
  const lng = coordinates[0];
  const lat = coordinates[1];
  Thing.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat]
        },
        $maxDistance: 100000
      }
    }
  })
    .find({ category: category })
    .find({ available: true })
    .then((things) => {
      res.json({ things });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

thingRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  Thing.findById(id)
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

// thingRouter.patch("/:id", routeGuard, upload.single("photo"), (req, response, next) => {
//   const id = req.params.id;
//   const { category, name, description, photo, coordinates } = req.body;
//   let data;
//   let pic;
//   if (!req.file) {
//     pic = photo;
//     data = { category, name, description, pic, coordinates };
//   } else {
//     pic = req.file.path;
//     data = { category, name, description, pic, coordinates };
//   }
//   Thing.findByIdAndUpdate(id, data)
//     .then((thing) => {
//       response.json({ thing });
//     })
//     .catch((error) => {
//       next(error);
//     });
// });

thingRouter.delete("/:id", routeGuard, (req, res, next) => {
  const id = req.params.id;
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
