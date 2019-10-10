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

module.exports = {
  checkNewUser,
  checkUsername
};
