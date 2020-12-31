const User = require("../models/user");
const { validationResult, buildCheckFunction } = require("express-validator");
const bcrypt = require("bcrypt");

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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.redirect("/");
  }

  return User.findOne({ email: email })
    .then(async (result) => {
      const doMatch = await bcrypt.compare(password, result.password);
      if (doMatch) {
        return res.redirect("/usermenu");
      }
      return res.redirect("/");
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
    console.log(errors);
    return res.redirect("/");
  }
  const { email, password } = req.body;
  bcrypt
    .hash(password, 12)
    .then((hashPass) => {
      const user = new User({
        email: email,
        password: hashPass,
        collections: [],
      });
      return user.save();
    })
    .then((user) => {
      console.log(user);
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.getUserMenu = (req, res, next) => {
  return res.render("usermenu.ejs", {
    pageTitle: "Menu",
  });
};
