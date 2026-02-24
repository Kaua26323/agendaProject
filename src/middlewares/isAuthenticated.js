function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    res.locals.errors = req.flash("errors", "Access denied. Please sign in.");
    req.session.save(() => {
      return res.status(401).redirect("/login");
    });

    return;
  }

  return next();
}

module.exports = isAuthenticated;
