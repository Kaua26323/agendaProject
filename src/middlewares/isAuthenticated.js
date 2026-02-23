function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    res.locals.errors = req.flash("errors", "Access denied. Please sign in.");
    return res.status(401).redirect("/login");
  }

  return next();
}

module.exports = isAuthenticated;
