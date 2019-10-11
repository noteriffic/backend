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

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const notes = await Notes.findByUser(id);

    if (notes) {
      res.status(200).json(notes);
    } else {
      res
        .status(400)
        .json({ message: "Could not find notes for specified user" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error getting notes" });
  }
});

module.exports = router;
