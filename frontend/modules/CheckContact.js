const validator = require("validator");

function CheckContact(formClass) {
  this.form = document.querySelector(formClass);
  this.errors = null;
}

CheckContact.prototype.init = function () {
  if (!this.form) return;
  this.events();
};

CheckContact.prototype.events = function () {
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

CheckContact.prototype.validate = function (el) {
  this.errors = null;
  this.removeOldErrors();

  const nameInput = el.querySelector("input[name='name']");
  const emailInput = el.querySelector("input[name='email']");
  const phoneNumberInput = el.querySelector("input[name='phoneNumber']");

  if (!nameInput.value) {
    this.errors = "!Name is required!";
    return;
  }

  if (emailInput.value && !validator.isEmail(emailInput.value)) {
    this.errors = "!Email is invalid!";
    return;
  }

  if (!phoneNumberInput.value && !emailInput.value) {
    this.errors = "Email or phone number is required.";
    return;
  }
};

CheckContact.prototype.renderError = function () {
  const formContainer = document.getElementById("formSection");
  const div = document.createElement("div");
  const p = document.createElement("p");
  p.textContent = this.errors;

  div.appendChild(p);
  div.className = "errorBox";
  formContainer.appendChild(div);
};

CheckContact.prototype.removeOldErrors = function () {
  const oldError = document.getElementById("formSection");
  if (oldError) oldError.innerHTML = "";
};

module.exports = CheckContact;
