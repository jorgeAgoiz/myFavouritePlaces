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
    errorMessage: null,
  });
};

exports.postSignIn = (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(422).render("signin.ejs", {
      pageTitle: "Sign In",
      errorMessage: errors.array()[0].msg,
    });
  }

  return User.findOne({ email: email })
    .then(async (result) => {
      const userId = result._id;
      if (!result) {
        return res.status(422).render("signin.ejs", {
          pageTitle: "Sign In",
          errorMessage: "Email not found",
        });
      }
      const doMatch = await bcrypt.compare(password, result.password);
      if (doMatch) {
        return res.redirect(`/usermenu/${userId}`);
      }

      return res.status(422).render("signin.ejs", {
        pageTitle: "Sign In",
        errorMessage: "Incorrect Password",
      });
    })
    .catch((err) => console.log(err));
};

exports.getSignUp = (req, res, next) => {
  res.render("signup.ejs", {
    pageTitle: "Sign Up",
    errorMessage: null,
  });
};

exports.postSignUp = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  const emailBussy = await User.findOne({ email: email });
  if (emailBussy) {
    return res.status(422).render("signup.ejs", {
      pageTitle: "Sign Up",
      errorMessage: "Email is already registered.",
    });
  }
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(422).render("signup.ejs", {
      pageTitle: "Sign Up",
      errorMessage: errors.array()[0].msg,
    });
  }

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
  const userId = req.params.userId;
  console.log(userId);
  return res.render("usermenu.ejs", {
    pageTitle: "Menu",
    userId: userId,
  });
};
