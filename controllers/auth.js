const User = require("../models/user");

exports.main = (req, res, next) => {
  res.render("main.ejs", {
    pageTitle: "Probando Probando",
  });
};

exports.getSignUp = (req, res, next) => {
  res.render("signup.ejs", {
    pageTitle: "Sign Up",
  });
};

exports.getSignIn = (req, res, next) => {
  res.render("signin.ejs", {
    pageTitle: "Sign In",
  });
};

exports.postSignUp = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  const user = new User({
    email: email,
    password: password,
    collections: [],
  });

  return user
    .save()
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};
