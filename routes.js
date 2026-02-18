const express = require("express");
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const registerController = require("./src/controllers/registerController");

const route = express.Router();

route.get("/", homeController.index);

//account routes
route.get("/login", loginController.index);
route.post("/signin", loginController.signIn);

route.get("/register", registerController.index);
route.post("/register/user", registerController.registerUser);

module.exports = route;
