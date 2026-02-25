const validator = require("validator");

class CheckLogin {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
    this.errors = null;
  }

  init() {
    if (!this.form) return;
    console.log("Class Login:", this.form);

    this.events();
    console.log("Errors dento do Login:", this.errors);
  }

  events() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      this.validate(e);

      if (this.errors) {
        this.renderError();
      } else {
        e.target.submit();
      }
    });
  }

  validate(e) {
    this.errors = null;
    this.removeOldErrors();

    const el = e.target;
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
  }

  renderError() {
    const formContainer = document.getElementById("formSection");
    const div = document.createElement("div");
    const p = document.createElement("p");

    p.textContent = this.errors;
    div.appendChild(p);
    div.className = "errorBox";
    formContainer.appendChild(div);
  }

  removeOldErrors() {
    const oldErrors = document.getElementById("formSection");
    if (oldErrors) oldErrors.innerHTML = "";
  }
}

module.exports = CheckLogin;
