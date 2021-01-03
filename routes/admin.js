//Express Routes
const express = require("express");
const adminRoute = express.Router();
//Package Validators
const { validTitle, validDescription } = require("../controllers/validators");

//Import the controllers
const {
  postCreateCollect,
  postSaveCollect,
  postShowCollect,
  postAddPlace,
  postSavePlace,
  postViewPlaces,
  postDeleteCollection,
  postDeletePlace, 
  postEditPlace
} = require("../controllers/admin");

// POST => "/createCollect"
adminRoute.post("/createCollect", postCreateCollect);

// POST => "/saveCollect"
adminRoute.post(
  "/saveCollect",
  [validTitle, validDescription],
  postSaveCollect
);

// POST => "/showCollect"
adminRoute.post("/showCollect", postShowCollect);

// POST => "/addplaces"
adminRoute.post("/addplaces", postAddPlace);

// POST => "/savePlace"
adminRoute.post("/savePlace", postSavePlace);

// POST => "/viewPlaces"
adminRoute.post("/viewPlaces", postViewPlaces);

//POST => "/deletecollection"
adminRoute.post("/deletecollection", postDeleteCollection);

//POST => "/deleteplace"
adminRoute.post("/deleteplace", postDeletePlace);

//POST => "/editplace"
adminRoute.post("/editplace", postEditPlace);

module.exports = { adminRoute };
