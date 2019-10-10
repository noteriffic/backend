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

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login({ username });
    const compare = bcrypt.compareSync(password, user.password);
    if (compare && user) {
      req.session.user = user;
      res.status(200).json({ message: `Welcome, ${user.username}`, user });
    } else {
      res.stataus(400).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server could not log user in" });
  }
});

module.exports = router;
