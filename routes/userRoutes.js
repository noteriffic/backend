const router = require("express").Router();
const bcrypt = require("bcryptjs");

// user helpers
const User = require("../helpers/userHelpers");

// middleware
const mw = require("../middleware/validation");

router.post(
  "/register",
  mw.checkNewUser,
  mw.checkUsername,
  async (req, res) => {
    const { body } = req;

    try {
      // hash password
      body.password = bcrypt.hashSync(body.password, 14);
      const user = await User.register(body);
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server could not register user" });
    }
  }
);

module.exports = router;
