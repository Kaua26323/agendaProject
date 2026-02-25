import "core-js/stable";
import "regenerator-runtime/runtime";
import "./assets/css/style.css";

const CheckLogin = require("./modules/CheckLogin");
const CheckRegister = require("./modules/CheckRegister");
const CheckContact = require("./modules/CheckContact");

const checkLoginForm = new CheckLogin(".formLogin");
const checkRegisterForm = new CheckRegister(".formRegister");
const checkContactForm = new CheckContact(".contactForm");

checkLoginForm.init();
checkRegisterForm.init();
checkContactForm.init();
