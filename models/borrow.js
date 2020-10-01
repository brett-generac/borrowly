const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    lender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    borrower: {
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
      default: false
    },
    closed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Borrow", schema);
