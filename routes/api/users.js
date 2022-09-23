const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
// Grab models
const User = require("../../models/User");

// @route   Post     api/users
// @desc    Register user
// @access  Public
router.post(
  "/",

  [
    // body(function, formatter)
    body("name", "Name is required").not().isEmpty(),
    body("email", "Please include a valid email").isEmail(),
    body(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    console.log(req.body.name);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructor req.body
    const { name, email, password } = req.body;

    // User.findOne() returns a promise
    try {
      // See if user already exists
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: [{ msg: "User Exists" }] });
      }

      // Grab gravatar from user
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      // Save to the database
      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          console.log("Here", token);
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);

      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
