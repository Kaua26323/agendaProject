const mongoose = require("mongoose");
const validator = require("validator");

const ContactSchema = new mongoose.Schema({
  name: { type: String, require: true },
  lastName: { type: String, require: false, default: "" },
  email: { type: String, require: false, default: "" },
  phoneNumber: { type: String, require: false, default: "" },
  createdAt: { type: Date, default: Date.now },
  userId: { type: String, require: true },
});

const ContactModel = mongoose.model("contacts", ContactSchema);

function Contact(body, userId) {
  this.body = body;
  this.errors = [];
  this.success = [];
  this.userId = userId;
  this.contact = null;
}

Contact.prototype.register = async function () {
  this.validate();

  if (this.errors.length > 0) return;

  this.contact = await ContactModel.create(this.body);
  console.log("this.body:", this.body);

  this.success.push("The contact was created successfully.");
};

Contact.prototype.update = async function (id) {
  if (typeof id !== "string") return this.errors.push("Id is invalid!");
  this.validate();

  if (this.errors.length > 0) return;

  this.contact = await ContactModel.findByIdAndUpdate(id, this.body, {
    new: true,
  });

  this.success.push("Contact updated successfully!");
};

Contact.prototype.validate = function () {
  this.cleanUp();

  if (!this.userId) {
    this.errors.push("ID is invalid!");
    console.error("userId", this.userId);
    return;
  }

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
    userId: this.userId,
  };
};

Contact.findById = async function (id) {
  const user = await ContactModel.findById(id);

  if (!user) return null;

  return user;
};

Contact.getContacts = async function (userId) {
  console.log("getContacts:", userId);
  if (!userId) return null;

  const contacts = await ContactModel.find({ userId: userId }).sort({
    createdAt: -1,
  });

  console.log("getContacts:", contacts);

  return contacts;
};

Contact.delete = async function (contactId) {
  if (!contactId || typeof contactId !== "string") return null;

  const deleted = await ContactModel.findOneAndDelete({ _id: contactId });
  return deleted;
};

module.exports = Contact;
