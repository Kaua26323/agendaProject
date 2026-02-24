const mongoose = require("mongoose");
const validator = require("validator");

const ContactSchema = new mongoose.Schema({
  name: { type: String, require: true },
  lastName: { type: String, require: false, default: "" },
  email: { type: String, require: false, default: "" },
  phoneNumber: { type: String, require: false, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const ContactModel = mongoose.model("contacts", ContactSchema);

function Contact(body) {
  this.body = body;
  this.errors = [];
  this.success = [];
  this.contact = null;
}

Contact.findById = async function (id) {
  const user = await ContactModel.findById(id);

  if (!user) return null;

  return user;
};

Contact.prototype.register = async function () {
  this.validate();
  if (this.errors.length > 0) return;

  this.contact = await ContactModel.create(this.body);

  this.success.push("Contact registred!");
};

Contact.prototype.validate = function () {
  this.cleanUp();

  if (!this.body.name) {
    this.errors.push("Name is required!");
    return;
  }

  if (this.body.email && !validator.isEmail(this.body.email)) {
    this.errors.push("Email is invalid!");
    return;
  }

  if (!this.body.phoneNumber && !this.body.email) {
    this.errors.push("Email or phone number is required.");
    return;
  }
};

Contact.prototype.cleanUp = function () {
  for (const key in this.body) {
    if (typeof this.body[key] !== "string") {
      this.body[key] = "";
    }
  }

  this.body = {
    name: this.body.name,
    lastName: this.body.lastName,
    email: this.body.email,
    phoneNumber: this.body.phoneNumber,
  };
};

module.exports = Contact;
