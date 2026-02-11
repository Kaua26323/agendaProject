const express = require("express");
const homePage = require("./src/controllers/homeController");
const route = express.Router();

route.get("/", homePage.homePage);

module.exports = route;
