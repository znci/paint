/**
 * @fileoverview Express app declaration.
 * -
 * app.js
 * (c) 2021-2023 znci. All rights reserved.
 * -
 * Part of the znci Paint project.
 * Please give credit where credit is due.
 * licensing: hello@znci.dev
 */

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

module.exports = app;
