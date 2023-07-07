/*
  Ample - Plenty of tools for znci's projects.
  Copyright (c) 2021-2023 znci. All rights reserved.
  v0.0.2
*/

/**
 * Returns a random element from an array.
 * @param {Array} array - The array to be randomized
 * */

function randomArr(array) {
  if (typeof array !== "object")
    throw new Error("The argument must be an array.");
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Returns a random integer between the min and max values.
 * @param {Number} min - The minimum value
 * @param {Number} max - The maximum value
 * */

function randomInt(min, max) {
  if (typeof min !== "number" || typeof max !== "number")
    throw new Error("The arguments must be numbers.");
  return Math.floor(Math.random() * max) + 1;
}

/**
 * Returns a random string of a specified length.
 * @param {Number} length - The length of the string
 * */

function randomStr(length) {
  if (typeof length !== "number")
    throw new Error("The argument must be a number.");
  let str = "";
  for (let i = 0; i < length; i++) {
    str += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }
  return str;
}

/**
 * Adds multiple listeners to multiple events.
 * @param {String} el
 * @param {Object} events
 * @param {Function} func
 */
function multiListener(el, events, func) {
  if (!typeof events === "object") throw new Error("Invalid events");
  if (!typeof func === "function") throw new Error("Invalid function");

  events.forEach((v) => {
    el.addEventListener(v, func);
  });
}

/**
 * Function to fix compatibility on mobile.
 * Relies on multiListener().
 */
function compListener(el, func) {
  multiListener(el, ["click", "touchmove", "touchend"], func);
}
