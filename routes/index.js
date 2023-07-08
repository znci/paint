/**
 * @fileoverview The main router for the znci Paint project.
 * -
 * routes/index.js
 * (c) 2021-2023 znci. All rights reserved.
 * -
 * Part of the znci Paint project.
 * Please give credit where credit is due.
 * licensing: hello@znci.dev
 */

var express = require("express");
var router = express.Router();
var expressWs = require("express-ws")(router);
var SQL = require("../lib/db");

var connections = [];

function broadcast(msg) {
  connections.forEach((con) => {
    con.send(msg);
  });
}

function randomStr(len) {
  var result = "";
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

var db = new SQL("./db.sqlite", { verbose: true });

db.run(
  "CREATE TABLE IF NOT EXISTS collabs (id TEXT PRIMARY KEY, name TEXT, owner TEXT, created_at TEXT)"
);

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

  if (!collab_id) {
    collab_id = randomStr(10);
  }

  db.run("INSERT INTO collabs VALUES (?, ?, ?, ?)", [
    collab_id,
    req.body.name,
    req.body.owner,
    new Date().toISOString()
  ]);
  res.redirect("/app/collaborate/" + collab_id);
});

router.get("/favicon.ico", function (req, res, next) {
  res.sendFile("favicon.ico", { root: "./public" });
});

router.get("/app/collaborate/:collab_id", function (req, res, next) {
  var collab_id = req.params.collab_id;

  db.get("SELECT * FROM collabs WHERE id = ?", [collab_id]).then((collab) => {
    if (!collab) {
      res.redirect("/app/collaborate");
    } else {
      res.sendFile("collab.html", { root: "./public" });
    }
  });

  //   res.send("uh oh spaghettio 404");
});

router.ws("/app/collaborate/:collab_id", function (ws, req) {
  connections.push(ws);
  ws.on("message", function (msg) {
    broadcast(msg);
  });
});

module.exports = router;
