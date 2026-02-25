exports.globalMiddleware = (req, res, next) => {
  const errors = req.flash("errors");
  const success = req.flash("success");

  res.locals.errors = errors;
  res.locals.success = success;
  res.locals.user = req.session.user;

  console.log("Errors:", res.locals.errors);
  console.log("Success:", res.locals.success);
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if (err) {
    console.log("Está caindo no checkCsrfError");
    console.error("!!!Error:", err);
    return res.render("404");
  }

  next();
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

exports.catchNotFoundPage = (req, res) => {
  res.status(404).render("404");
};
