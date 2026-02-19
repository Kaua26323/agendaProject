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
      req.session.save(function () {
        return res.redirect("/login");
      });
      return;
    }
    req.flash("success", login.success);
    req.session.user = login.user;
    req.session.save(function () {
      return res.redirect("/login");
    });
    return;
  } catch (err) {
    console.log(err);
    return res.render("404");
  }
};

exports.logOut = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
