/**
 * @fileoverview A class for handling SQLite databases.
 * -
 * SQL.js
 * (c) 2021-2023 znci. All rights reserved.
 * -
 * Part of the znci Paint project.
 * Please give credit where credit is due.
 * licensing: hello@znci.dev
 */

const sqlite3 = require("sqlite3").verbose();
const path = require("path");

/**
 * @class
 * @classdesc A class for handling SQLite databases.
 * @param {String} dbPath - The path to the database.
 * @param {Object} options - The options for the database.
 * @param {Boolean} options.verbose - Whether to print verbose messages.
 */

class SQL {
  // Initialize class
  constructor(dbPath, options = {}) {
    if (!dbPath) throw new Error("No database path provided.");
    this.dbPath = dbPath;
    this.options = options;
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) throw new Error(err);
      if (this.options.verbose) console.log(`Connected to ${dbPath}`);
    });
  }

  // Run a query
  run(query, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(query, params, function (err) {
        if (err) reject(err);
        resolve(this);
      });
    });
  }

  // Get a row
  get(query, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(query, params, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  // Get all rows
  all(query, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(query, params, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  // Close the database
  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }
}

module.exports = SQL;
