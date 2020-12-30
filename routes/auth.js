//Express Routes
const express = require("express");
const authRoute = express.Router();

//Import controllers
const { main, signup, signin, menu } = require("../controllers/auth");

//Routes
authRoute.get("/", main);

authRoute.get("/signup", signup);

authRoute.get("/signin", signin);

authRoute.post("/menu", menu);

module.exports = { authRoute };
