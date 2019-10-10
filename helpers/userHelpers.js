const db = require("../data/db-config");

const register = newUser => {
  return db("users")
    .insert(newUser, "id")
    .then(([id]) => {
      return findById(id);
    });
};

const findById = id => {
  return db("users")
    .where({ id })
    .first();
};

const login = filter => {
  return db("users")
    .where(filter)
    .first();
};

module.exports = {
  register,
  findById,
  login
};
