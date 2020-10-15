"use strict";

module.exports = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    const error = new Error("You need to be logged in to do that");
    error.status = 401;
    next(error);
  }
};
