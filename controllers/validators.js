const { check, body } = require("express-validator");
const User = require("../models/user");

module.exports = {
  validEmail: body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Must be a valid email.")
    .custom((email) => {
      return User.findOne({ email: email })
        .then((result) => {
          if (result) {
            return Promise.reject("This email is already registeres.");
          }
        })
        .catch((err) => console.log(err));
    }),
  validPassword: body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 5, max: 20 })
    .withMessage("Must be between 5 and 20 characters."),
  validPasswordConfirm: body("confirmPassword")
    .trim()
    .isLength({ min: 5, max: 20 })
    .withMessage("Must be between 5 and 20 characters.")
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage("Passwords have to match."),
};
