// User model and Packages
const User = require("../models/user");
const { validationResult } = require("express-validator");

exports.postCreateCollect = (req, res, next) => {
  const id = req.body.id;
  console.log(id);
  return res.render("addcollection.ejs", {
    pageTitle: "Add Collection",
    userId: id,
  });
};

exports.saveCollect = (req, res, next) => {
  const { id, title, description } = req.body;
  console.log(id);

  User.findById(id)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
  // NExt Step
};
