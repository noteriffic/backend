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
    .where({ id: userId })
    .join("notes", "users.id", "notes.user_id")
    .select("notes.title", "notes.body", "notes.createdAt", "notes.updatedAt");
};

module.exports = {
  findByUser,
  findNote,
  createNote
};
