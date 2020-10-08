"use strict";

const { Router } = require("express");
const router = new Router();

router.get("/", (req, res) => {
  res.json({ response: true });
});

module.exports = router;
