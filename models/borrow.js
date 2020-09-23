const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    renter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    thing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thing",
      required: true
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: {
      createdAt: "startedAt",
      updatedAt: "endedAt"
    }
  }
);

module.exports = mongoose.model("Borrow", schema);
