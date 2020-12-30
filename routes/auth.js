//Express Routes
const express = require("express");
const authRoute = express.Router();

//Import controllers
const { main, signup, signin, menu } = require("../controllers/auth");

// *********** Routes ***********

// GET => "/"
authRoute.get("/", main);

// GET => "/signup"
authRoute.get("/signup", signup);

// POST => "/signup"
authRoute.post("/signup", menu);

// GET => "/signin"
authRoute.get("/signin", signin);

module.exports = { authRoute };
