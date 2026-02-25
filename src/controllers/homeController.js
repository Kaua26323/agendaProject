const Contact = require("../models/contactModel");

exports.index = (req, res) => {
  res.render("home");
};

exports.dashboard = async (req, res) => {
  try {
    const userId = req.session.user._id;

    const contactsList = await Contact.getContacts(userId);

    if (!contactsList) return res.render("404");

    return res.render("dashboard", { contactsList });
  } catch (err) {
    console.error(err);
    return res.render("404");
  }
};
