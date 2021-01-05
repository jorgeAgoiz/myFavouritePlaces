//Express Routes
const express = require("express");
const authRoute = express.Router();
//Package Validators
const {
  validEmail,
  validPassword,
  validPasswordConfirm,
} = require("../controllers/validators");

//Import controllers
const {
  main,
  getSignIn,
  getSignUp,
  postSignUp,
  postSignIn,
  getUserMenu,
  getLogOut,
} = require("../controllers/auth");

// *********** Routes ***********

// GET => "/"
authRoute.get("/", main);

// GET => "/signup"
authRoute.get("/signup", getSignUp);
// POST => "/signup"
authRoute.post(
  "/signup",
  [validEmail, validPassword, validPasswordConfirm],
  postSignUp
);

// GET => "/signin"
authRoute.get("/signin", getSignIn);
// POST => "/signup"
authRoute.post("/signin", [validEmail, validPassword], postSignIn);

//GET => "/usermenu"
authRoute.get("/usermenu", getUserMenu);

//GET => "/logout"
authRoute.get("/logout", getLogOut);

module.exports = { authRoute };
