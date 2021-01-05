const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

exports.main = (req, res, next) => {
  res.render("main.ejs", {
    pageTitle: "My Places",
    isAuthenticated: false,
  });
};

exports.getSignIn = (req, res, next) => {
  res.render("signin.ejs", {
    pageTitle: "Sign In",
    errorMessage: null,
    isAuthenticated: false,
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
      isAuthenticated: false,
    });
  }

  return User.findOne({ email: email })
    .then(async (result) => {
      const userId = result._id;
      if (!result) {
        return res.status(422).render("signin.ejs", {
          pageTitle: "Sign In",
          errorMessage: "Email not found",
          isAuthenticated: false,
        });
      }
      const doMatch = await bcrypt.compare(password, result.password);
      if (doMatch) {
        req.session.user = result;
        return req.session.save((err) => {
          if (err) console.log(err);

          return res.redirect(`/usermenu`);
        });
      }

      return res.status(422).render("signin.ejs", {
        pageTitle: "Sign In",
        errorMessage: "Incorrect Password",
        isAuthenticated: false,
      });
    })
    .catch((err) => console.log(err));
};

exports.getSignUp = (req, res, next) => {
  res.render("signup.ejs", {
    pageTitle: "Sign Up",
    errorMessage: null,
    isAuthenticated: false,
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
      isAuthenticated: false,
    });
  }
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(422).render("signup.ejs", {
      pageTitle: "Sign Up",
      errorMessage: errors.array()[0].msg,
      isAuthenticated: false,
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
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.getUserMenu = (req, res, next) => {
  const userId = req.user._id;
  return res.render("usermenu.ejs", {
    pageTitle: "Menu",
    userId: userId,
    isAuthenticated: true,
  });
};

exports.getLogOut = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) console.log(err);

    return res.redirect("/");
  });
};
