const Note = require("../models/note");

const createNote = async (req, res) => {
    // Get the data off the req body
    const abc = req.body.title;
    const def = req.body.body;
    const ghi = req.body.content;


    const note = await Note.create({
        title2: abc,
        body2: def,
        content2: ghi,
    });

    res.json({ note: note });
};

const fetchNotes = async (req, res) => {
    // Find the notes
    const notes = await Note.find();

    // Respond with them
    res.json({ notes: notes });
};

const fetchNote = async (req, res) => {
    // Get id off the URL
    const noteId = req.params.id;

    // Find the note using that id
    const note = await Note.findById(noteId);

    // Respond with the note
    res.json({ note: note });
};

const updateNote = async (req, res) => {
    // Get the id off the URL
    const noteId = req.params.id;

    // Get the data off the req body
    const abc = req.body.title;
    const def = req.body.body;
    const ghi = req.body.content;

    // Find and update the record
    await Note.findByIdAndUpdate(noteId, {
        title2: abc, // Fixed field names
        body2: def,
        content2: ghi,
    });

    // Find updated note
    const note = await Note.findById(noteId);

    // Respond with it
    res.json({ note: note });
};

const deleteNote = async (req, res) => {
    // Get id off URL
    const noteId = req.params.id;

    // Delete the record (Fixed the query)
    await Note.deleteOne({_id: noteId});

    // Respond
    res.json({ success: "Record deleted" });
};

module.exports = {
    fetchNotes,
    fetchNote,
    createNote,
    updateNote,
    deleteNote,
};
