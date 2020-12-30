exports.main = (req, res, next) => {
  res.render("main.ejs", {
    pageTitle: "Probando Probando",
  });
};

exports.signup = (req, res, next) => {
  res.render("signup.ejs", {
    pageTitle: "Sign Up",
  });
};

exports.signin = (req, res, next) => {
  res.render("signin.ejs", {
    pageTitle: "Sign In",
  });
};

exports.menu = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  console.log(req.body);
};
