const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    category: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
      max: 280
    },
    photoUrl: {
      type: String,
      required: true
    },
    location: {
      type: {
        type: String,
        default: "Point"
      },
      coordinates: {
        type: [],
        max: 180,
        min: -180,
        required: true
      }
    },
    available: {
      type: Boolean,
      default: true
    }
  },
  {
    timeStamps: true
  }
);

module.exports = mongoose.model("Thing", schema);
