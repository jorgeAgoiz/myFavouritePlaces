// User model and Packages
const User = require("../models/user");
const { validationResult } = require("express-validator");

exports.postCreateCollect = (req, res, next) => {
  const id = req.body.id;
  return res.render("addcollection.ejs", {
    pageTitle: "Add Collection",
    userId: id,
    errorMessage: null,
  });
};

exports.saveCollect = (req, res, next) => {
  const { id, title, description } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("addcollection.ejs", {
      pageTitle: "Add Collection",
      errorMessage: errors.array()[0].msg,
      userId: id,
    });
  }

  User.findOneAndUpdate(id, {
    $push: { collections: { title: title, description: description } },
  })
    .then((result) => {
      console.log(result);
      res.redirect(`/usermenu/${result._id}`);
    })
    .catch((err) => console.log(err));
};
