const mongoose = require("mongoose");
const validator = require("validator");
const UserSchema = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
});

const UserModel = mongoose.model("User", UserSchema);

class CreateAccount {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.success = [];
    this.user = null;
  }

  async register() {
    this.validate();
    if (this.errors.length > 0) return;

    try {
      this.user = await UserModel.create("User", UserSchema);
      this.success.push("Account created successfully!");
      return;
    } catch (err) {
      console.error("!!!Error:", err);
      return;
    }
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

    if (this.body.password < 6 || this.body.password > 50) {
      this.errors.push("Password must be 6-50 characters.");
      return;
    }
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }

      this.body = {
        email: this.body.email,
        password: this.body.password,
      };
    }
  }
}

module.exports = CreateAccount;
