//Express Routes
const express = require("express");
const adminRoute = express.Router();

//Import the controllers
const { postCreateCollect, saveCollect } = require("../controllers/admin");

// POST => "/createCollect"
adminRoute.post("/createCollect", postCreateCollect);

// POST => "/saveCollect"
adminRoute.post("/saveCollect", saveCollect);

module.exports = { adminRoute };
