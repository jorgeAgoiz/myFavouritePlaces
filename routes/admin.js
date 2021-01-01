//Express Routes
const express = require("express");
const adminRoute = express.Router();
//Package Validators
const { validTitle, validDescription } = require("../controllers/validators");

//Import the controllers
const { postCreateCollect, saveCollect } = require("../controllers/admin");

// POST => "/createCollect"
adminRoute.post("/createCollect", postCreateCollect);

// POST => "/saveCollect"
adminRoute.post("/saveCollect", [validTitle, validDescription], saveCollect);

module.exports = { adminRoute };
