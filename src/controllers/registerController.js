const { CreateAccount } = require("../models/RegisterModel");

exports.index = (req, res) => {
  res.render("register");
};

exports.registerUser = async function (req, res) {
  try {
    const createAccount = new CreateAccount(req.body);

    await createAccount.register();

    if (createAccount.errors.length > 0) {
      console.log("Está caindo no if de errors");
      req.flash("errors", createAccount.errors);
      return req.session.save(() => res.status(400).redirect("/register"));
    }

    req.flash("success", createAccount.success);
    return req.session.save(() => res.redirect("/register"));
  } catch (err) {
    console.error(err);
    return res.render("404");
  }
};
