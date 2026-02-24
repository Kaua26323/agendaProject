const Contact = require("../models/contactModel");

exports.index = (req, res) => {
  res.render("contact", { contact: {} });
};

exports.register = async (req, res) => {
  try {
    const contact = new Contact(req.body);

    await contact.register();

    if (contact.errors.length > 0) {
      req.flash("errors", contact.errors);
      return req.session.save(() => res.status(400).redirect("/contact"));
    }

    req.flash("sucess", contact.success);
    return req.session.save(() =>
      res.redirect(`/contact/${contact.contact._id}`),
    );
  } catch (err) {
    console.error(err);
    return res.render("404");
  }
};

exports.updateContact = async (req, res) => {
  if (!req.params.id) {
    console.error("Está caindo dentro do if(!req.params.id)");
    return res.status(404).render("404");
  }

  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      req.flash("errors", "Id not found");
      return res.status(404).render("404");
    }

    return res.render("contact", { contact });
  } catch (err) {
    console.error(err);
    return res.status(404).render("404");
  }
};
