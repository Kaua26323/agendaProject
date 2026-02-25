const validator = require("validator");

function CheckRegister(formClass) {
  this.form = document.querySelector(formClass);
  this.errors = null;
}

CheckRegister.prototype.init = function () {
  if (!this.form) return;
  this.events();
};

CheckRegister.prototype.events = function () {
  this.form.addEventListener("submit", (e) => {
    e.preventDefault();

    this.validate(e.target);

    if (this.errors) {
      this.renderError();
    } else {
      e.target.submit();
    }
  });
};

CheckRegister.prototype.validate = function (el) {
  this.errors = null;
  this.removeOldErrors();

  const emailInput = el.querySelector("input[name='email']");
  const passwordInput = el.querySelector("input[name='password']");

  if (!emailInput.value) {
    this.errors = "!Email is required!";
    return;
  }

  if (!passwordInput.value) {
    this.errors = "!Password is required!";
    return;
  }

  if (!validator.isEmail(emailInput.value)) {
    this.errors = "!Email is invalid!";
    return;
  }

  if (passwordInput.value.length < 6 || passwordInput.value.length > 50) {
    this.errors = "Password must be 6-50 characters.";
    return;
  }
};

CheckRegister.prototype.renderError = function () {
  const formContainer = document.getElementById("formSection");
  const div = document.createElement("div");
  const p = document.createElement("p");
  p.textContent = this.errors;

  div.appendChild(p);
  div.className = "errorBox";
  formContainer.appendChild(div);
};

CheckRegister.prototype.removeOldErrors = function () {
  const oldError = document.getElementById("formSection");
  if (oldError) oldError.innerHTML = "";
};

module.exports = CheckRegister;
