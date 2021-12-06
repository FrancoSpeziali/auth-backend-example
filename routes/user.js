const express = require("express");
const passport = require("passport");
const router = express.Router();
const { resetPassword, login, registration } = require("../controllers/userControllers");
const { validateNewUser, validateUserExists } = require("../middleware/user");

router.post('/reset-password', passport.authenticate('jwt', { session: false }), resetPassword);
router.post('/login', validateUserExists, login);
router.post('/register', validateNewUser, registration);

module.exports = router;
