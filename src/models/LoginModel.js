const { UserModel } = require("./RegisterModel");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.success = [];
    this.user = null;
  }

  async signIn() {
    this.validate();
    if (this.errors.length > 0) return;

    this.user = await UserModel.findOne({ email: this.body.email });

    if (!this.user) {
      this.errors.push("Email/Password is invalid");
      return;
    }

    const passwordMatch = await bcryptjs.compare(
      this.body.password,
      this.user.password,
    );

    if (!passwordMatch) {
      this.errors.push("Email/Password is invalid");
      this.user = null;
      return;
    }

    this.success.push("!Welcome back!");
  }

  validate() {
    this.cleanUp();

    if (!this.body.email || !this.body.password) {
      this.errors.push("Email/Password is invalid");
      return;
    }

    if (!validator.isEmail(this.body.email)) {
      this.errors.push("Email is invalid!");
      return;
    }
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }
}

module.exports = Login;
