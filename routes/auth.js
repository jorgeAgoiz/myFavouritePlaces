//Express Routes
const express = require("express");
const authRoute = express.Router();
//Packages
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
authRoute.post("/signin", postSignIn);

module.exports = { authRoute };
