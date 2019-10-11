const router = require("express").Router();

// notes helpers
const Notes = require("../helpers/notesHelpers");

// middleware
const mw = require("../middleware/validation");

router.post("/create", mw.checkNewNote, async (req, res) => {
  const newNote = req.body;

  try {
    const result = await Notes.createNote(newNote);
    console.log("result", result);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error trying to create new note" });
  }
});

module.exports = router;
