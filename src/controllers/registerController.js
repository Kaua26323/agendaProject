const CreateAccount = require("../models/RegisterModel");

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
      req.session.save(function () {
        return res.redirect("/register");
      });
      return;
    }

    req.flash("success", createAccount.success);
    req.session.save(function () {
      return res.redirect("/register");
    });

    return;
  } catch (err) {
    console.log(err);
    return res.render("404");
  }
};
