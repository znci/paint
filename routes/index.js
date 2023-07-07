var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.sendFile("index.html");
});

router.get("/app", function (req, res, next) {
  res.sendFile("app.html", { root: "./public" });
});

module.exports = router;
