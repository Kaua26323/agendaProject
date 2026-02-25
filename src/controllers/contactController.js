const Contact = require("../models/contactModel");

exports.index = (req, res) => {
  res.render("contact", { contact: {} });
};

exports.register = async (req, res) => {
  try {
    const userId = req.session.user._id;
    console.log("req.session.user:", req.session.user);
    console.log("userId:", userId);
    console.log("userId Type:", typeof userId);

    const contact = new Contact(req.body, userId);

    await contact.register();

    if (contact.errors.length > 0) {
      req.flash("errors", contact.errors);
      return req.session.save(() => res.status(400).redirect("/contact"));
    }

    req.flash("success", contact.success);
    return req.session.save(() => {
      res.redirect(`/contact`);
    });
  } catch (err) {
    console.error(err);
    return res.render("404");
  }
};

exports.catchContact = async (req, res) => {
  if (!req.params.id) {
    console.error("Está caindo dentro do if(!req.params.id)");
    return res.status(404).render("404");
  }

  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).render("404");

    return res.render("contact", { contact });
  } catch (err) {
    console.error(err);
    return res.status(404).render("404");
  }
};

exports.updateContact = async (req, res) => {
  try {
    if (!req.params.id) return;
    const userId = req.session.user._id;

    const contact = new Contact(req.body, userId);
    await contact.update(req.params.id);

    if (contact.errors.length > 0) {
      req.flash("errors", contact.errors);
      return req.session.save(() => res.status(400).redirect("/contact"));
    }

    req.flash("success", contact.success);
    return req.session.save(() => {
      res.redirect(`/contact/${contact.contact._id}`);
    });
  } catch (err) {
    console.error(err);
    res.render("404");
  }
};

exports.deleteContact = async (req, res) => {
  if (!req.params.id) return res.render("404");
  try {
    const contactId = req.params.id;
    const filtered = await Contact.delete(contactId);
    console.log("deleted contact:", filtered);

    req.flash("success", "Contact deleted!");
    return req.session.save(() => res.redirect("/dashboard"));
  } catch (err) {
    console.error(err);
    res.render("404");
  }
};
