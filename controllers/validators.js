const { check, body } = require("express-validator");

module.exports = {
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
        throw new Error("Passwords must match.");
      }
      return true;
    }),
};
