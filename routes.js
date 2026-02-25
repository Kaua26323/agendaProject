const express = require("express");
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const registerController = require("./src/controllers/registerController");
const contactController = require("./src/controllers/contactController");

const isAuthenticated = require("./src/middlewares/isAuthenticated");

const route = express.Router();

//        Home routes
route.get("/", homeController.index);
route.get("/dashboard", isAuthenticated, homeController.dashboard);

//        Login routes
route.get("/login", loginController.index);
route.post("/signin", loginController.signIn);
route.get("/logout", loginController.logOut);

//        Register routes
route.get("/register", registerController.index);
route.post("/register/user", registerController.registerUser);

//        contact routes
route.get("/contact", isAuthenticated, contactController.index);
route.post("/contact/register", isAuthenticated, contactController.register);
route.get("/contact/:id", isAuthenticated, contactController.catchContact);
route.post(
  "/contact/update/:id",
  isAuthenticated,
  contactController.updateContact,
);
route.get(
  "/contact/delete/:id",
  isAuthenticated,
  contactController.deleteContact,
);

module.exports = route;
