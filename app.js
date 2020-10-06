//"use strict";

const { join } = require("path");
const express = require("express");
const createError = require("http-errors");
const logger = require("morgan");
const cors = require("cors");
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");
const mongoose = require("mongoose");
const serveFavicon = require("serve-favicon");

const basicAuthenticationDeserializer = require("./middleware/basic-authentication-deserializer.js");
const bindUserToViewLocals = require("./middleware/bind-user-to-view-locals.js");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const thingRouter = require("./routes/thing");
const borrowRouter = require("./routes/borrow");

const mongoStore = connectMongo(expressSession);

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
      maxAge: 60 * 60 * 24 * 15 * 1000,
      //changed sameSite from lax to none, changed secure to always true, deleted httpOnly: true
      sameSite: "none",
      secure: true
    },
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 * 24
    })
  })
);
app.use(basicAuthenticationDeserializer);
app.use(bindUserToViewLocals);

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
