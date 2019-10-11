const db = require("../data/db-config");
const User = require("../helpers/userHelpers");

const checkUsername = async (req, res, next) => {
  const { username } = req.body;

  try {
    const result = await db("users")
      .where({ username })
      .first();

    if (result) {
      res.status(400).json({ message: "username already taken" });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error checking username" });
  }
};

const checkNewUser = (req, res, next) => {
  const { body } = req;

  if (
    body.firstName &&
    body.lastName &&
    body.email &&
    body.username &&
    body.password &&
    body.country
  ) {
    next();
  } else {
    res.status(400).json({ message: "All fields are required to register" });
  }
};

const checkLogin = (req, res, next) => {
  const { username, password } = req.body;

  if (username && password) {
    next();
  } else {
    res
      .status(400)
      .json({ message: "username and password are both required" });
  }
};

const checkNewNote = (req, res, next) => {
  const { title, body } = req.body;

  if (title && body) {
    next();
  } else {
    res.status(400).json({
      message: "A valid title and body are required to create a new note"
    });
  }
};

module.exports = {
  checkNewUser,
  checkUsername,
  checkLogin,
  checkNewNote
};
