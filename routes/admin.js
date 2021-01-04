//Express Routes
const express = require("express");
const adminRoute = express.Router();
//Package Validators
const { validTitle, validDescription, validDirection, validComments, validName } = require("../controllers/validators");

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
  postEditPlace,
  postEditSavePlace
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
adminRoute.post("/savePlace", [validName, validDirection, validComments], postSavePlace);

// POST => "/viewPlaces"
adminRoute.post("/viewPlaces", postViewPlaces);

//POST => "/deletecollection"
adminRoute.post("/deletecollection", postDeleteCollection);

//POST => "/deleteplace"
adminRoute.post("/deleteplace", postDeletePlace);

//POST => "/editplace"
adminRoute.post("/editplace", postEditPlace);

//POST => "/editsaveplace"
adminRoute.post("/editsaveplace", [validName, validDirection, validComments], postEditSavePlace);

module.exports = { adminRoute };
