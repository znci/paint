var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.sendFile("index.html");
});

router.get("/app", function (req, res, next) {
  res.sendFile("app.html", { root: "./public" });
});

router.get("/app/collaborate", function (req, res, next) {
  res.sendFile("collaborate.html", { root: "./public" });
});

router.post("/app/collaborate", function (req, res, next) {
  var collab_id = req.body.collab_id;
  // TODO: check if collab_id is valid
  res.redirect("/app/collaborate/" + collab_id);
});

router.get("/app/collaborate/:collab_id", function (req, res, next) {
  var collab_id = req.params.collab_id;
  // TODO: collaborative painting
  res.send(collab_id);
});

router.get("/favicon.ico", function (req, res, next) {
  res.sendFile("favicon.ico", { root: "./public" });
});

module.exports = router;
