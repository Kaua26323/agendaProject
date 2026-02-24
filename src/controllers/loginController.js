const Login = require("../models/LoginModel");

exports.index = (req, res) => {
  res.render("login");
};

exports.signIn = async (req, res) => {
  try {
    const login = new Login(req.body);

    await login.signIn();

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      return req.session.save(() => res.redirect("/login"));
    }

    req.flash("success", login.success);
    req.session.user = login.user;
    return req.session.save(() => res.redirect("/dashboard"));
  } catch (err) {
    console.error(err);
    return res.render("404");
  }
};

exports.logOut = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
