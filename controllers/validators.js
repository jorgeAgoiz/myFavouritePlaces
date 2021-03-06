const { check, body } = require("express-validator");

module.exports = {
  //Authentication Validators
  validEmail: body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Must be a valid email."),
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
  validTitle: body("title") // ************ Add Collections and Add Places Validators
    .trim()
    .isLength({ min: 5, max: 30 })
    .toUpperCase()
    .withMessage("Enter a valid title."),
  validDescription: body("description")
    .trim()
    .isLength({ min: 5, max: 400 })
    .withMessage("A short description is needed."),
  validDirection: body("direction")
    .trim()
    .isLength({ min: 10, max: 100 })
    .withMessage("Enter a valid direction."),
  validName: body("name")
    .trim()
    .isLength({ min: 3, max: 30 })
    .toUpperCase()
    .withMessage("Enter a valid name."),
  validComments: body("comments")
    .trim()
    .isLength({ min: 5, max: 400 })
    .withMessage("A short description is needed."),
};
