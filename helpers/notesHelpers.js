const db = require("../data/db-config");

const findNote = noteId => {
  return db("notes")
    .where({ id: noteId })
    .first();
};

const createNote = newNote => {
  return db("notes")
    .insert(newNote, "id")
    .then(([id]) => {
      console.log("NOTE ID", id);
      return findNote(id);
    });
};

const findByUser = userId => {
  return db("users")
    .join("notes", "users.id", "notes.user_id")
    .where({ "users.id": userId })
    .select(
      "notes.title",
      "notes.body",
      "notes.created_at",
      "notes.updated_at"
    );
};

module.exports = {
  findByUser,
  findNote,
  createNote
};
