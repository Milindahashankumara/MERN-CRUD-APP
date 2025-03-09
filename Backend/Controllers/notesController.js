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



exports.deleteNote = async (req, res) => {
    console.log("DELETE request received with ID:", req.params.id); // Debug log
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


module.exports = {
    fetchNotes,
    fetchNote,
    createNote,
    updateNote,
    deleteNote,
};
