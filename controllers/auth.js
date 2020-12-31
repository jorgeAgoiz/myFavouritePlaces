const User = require("../models/user");
const { validationResult } = require("express-validator");

exports.main = (req, res, next) => {
  res.render("main.ejs", {
    pageTitle: "Probando Probando",
  });
};

exports.getSignIn = (req, res, next) => {
  res.render("signin.ejs", {
    pageTitle: "Sign In",
  });
};

exports.postSignIn = (req, res, next) => {
  const { email, password } = req.body;
  console.log(`Email: ${email}. --- Password: ${password}`);

  return User.findOne({ email: email })
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.getSignUp = (req, res, next) => {
  res.render("signup.ejs", {
    pageTitle: "Sign Up",
  });
};

exports.postSignUp = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return console.log(errors);
  }

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
