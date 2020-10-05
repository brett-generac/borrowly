"use strict";

const { join } = require("path");
const express = require("express");
const mongoose = require("mongoose");
const connectMongo = require("connect-mongo");
const expressSession = require("express-session");
const cors = require("cors");
const createError = require("http-errors");
const logger = require("morgan");
const serveFavicon = require("serve-favicon");
const basicAuthenticationDeserializer = require("./middleware/basic-authentication-deserializer.js");
const bindUserToViewLocals = require("./middleware/bind-user-to-view-locals.js");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const thingRouter = require("./routes/thing");
const borrowRouter = require("./routes/borrow");

const app = express();

app.set("trust proxy", 1);

app.use(logger("dev"));
app.use(serveFavicon(join(__dirname, "public/images", "favicon.ico")));
app.use(
  cors({
    origin: [process.env.CLIENT_APP_URL],
    credentials: true
  })
);

app.use(express.json());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 15,
      //changed sameSite from lax to none
      sameSite: "lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
    },
    store: new (connectMongo(expressSession))({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 * 24
    })
  })
);
app.use(basicAuthenticationDeserializer);
app.use(bindUserToViewLocals);

//adding access headers to see if that is what's causing problem
app.use((req, res, next) => {
  res.header("Access-Control Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/things", thingRouter);
app.use("/borrows", borrowRouter);

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({ type: "error", error: { message: error.message } });
});

module.exports = app;
