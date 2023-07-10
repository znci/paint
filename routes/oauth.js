/**
 * @fileoverview OAuth2 router for the znci Paint project.
 * -
 * routes/oauth.js
 * (c) 2021-2023 znci. All rights reserved.
 * -
 * Part of the znci Paint project.
 * Please give credit where credit is due.
 * licensing: hello@znci.dev
 */

var express = require("express");
var router = express.Router();
var db = require("./index");
var XMLHttpRequest = require("xmlhttprequest-ssl").XMLHttpRequest;
var session = require("express-session");
require("dotenv").config();

router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  })
);

var Provider = {
  name: "Discord",
  client_id: process.env.DISCORD_CLIENT_ID,
  client_secret: process.env.DISCORD_CLIENT_SECRET,
  redirect_uri: process.env.DISCORD_REDIRECT_URI,
  scope: "identify",
  authorize_url: "https://discord.com/api/oauth2/authorize",
  token_url: "https://discord.com/api/oauth2/token",
  user_url: "https://discord.com/api/users/@me"
};

router.get("/", function (req, res, next) {
  res.redirect(
    Provider.authorize_url +
      "?client_id=" +
      Provider.client_id +
      "&redirect_uri=" +
      Provider.redirect_uri +
      "&response_type=code&scope=" +
      Provider.scope
  );
});

router.get("/callback", async function (req, res, next) {
  var code = req.query.code;

  // Standard code-to-token exchange
  var xhr = new XMLHttpRequest();
  xhr.open("POST", Provider.token_url);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.setRequestHeader(
    "Authorization",
    "Basic " +
      // ensure client_id and client_secret are URL encoded
      Buffer.from(
        encodeURIComponent(Provider.client_id) +
          ":" +
          encodeURIComponent(Provider.client_secret)
      ).toString("base64")
  );
  xhr.send(
    "grant_type=authorization_code&code=" +
      encodeURIComponent(code) +
      "&redirect_uri=" +
      encodeURIComponent(Provider.redirect_uri)
  );

  xhr.onreadystatechange = async function () {
    // Get username, and user ID
    var xhr2 = new XMLHttpRequest();
    xhr2.open("GET", Provider.user_url);

    // Set the Authorization header
    xhr2.setRequestHeader(
      "Authorization",
      "Bearer " + JSON.parse(xhr.responseText).access_token
    );

    xhr2.send();

    xhr2.onreadystatechange = async function () {
      var user = JSON.parse(xhr2.responseText);

      // Check if the user is in the database
      var userInDB = await db.get("SELECT * FROM users WHERE id = ?", [
        user.id
      ]);

      // If the user is not in the database, add them
      if (!userInDB) {
        await db.run("INSERT INTO users VALUES (?, ?, ?, ?, ?)", [
          user.id,
          user.username,
          user.discriminator,
          user.avatar,
          user.email
        ]);
      }

      // Set the session
      req.session.user = user;

      // Redirect to the app
      res.redirect("/");
    };
  };
});

router.get("/logout", function (req, res, next) {
  req.session.destroy();
  res.redirect("/");
});

router.get("/me", function (req, res, next) {
  res.json(req.session.user);
});

module.exports = router;
