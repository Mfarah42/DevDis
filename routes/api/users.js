const express = require("express");
const router = express.Router();

// @route   Post     api/users
// @desc    Register user
// @access  Public
router.post("/", (req, res) => {
  console.log(req.body);
  res.send("Users Route");
});

module.exports = router;
