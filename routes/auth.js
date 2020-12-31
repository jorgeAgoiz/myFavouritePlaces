//Express Routes
const express = require("express");
const authRoute = express.Router();

//Import controllers
const {
  main,
  getSignIn,
  getSignUp,
  postSignUp,
} = require("../controllers/auth");

// *********** Routes ***********

// GET => "/"
authRoute.get("/", main);

// GET => "/signup"
authRoute.get("/signup", getSignUp);

// POST => "/signup"
authRoute.post("/signup", postSignUp);

// GET => "/signin"
authRoute.get("/signin", getSignIn);

module.exports = { authRoute };
