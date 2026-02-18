exports.index = (req, res) => {
  res.render("login");
};

exports.signIn = (req, res) => {
  res.send("user is trying to signIn");
};
