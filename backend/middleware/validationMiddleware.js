const { body, param, validationResult } = require("express-validator");

const validateSignup = [
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password")
    .isLength({ min: 1 }) // Changed minimum password length to 1
    .withMessage("Password must be at least 1 character"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateLogin = [
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateSignup,
  validateLogin,
};
