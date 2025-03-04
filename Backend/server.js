require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const notesController = require("./Controllers/notesController");

const app = express();

// Connect to database
connectToDb();

// Middleware
app.use(express.json());
app.use(cors()); // ✅ Fixed: CORS is now properly imported and used

// Routes
app.post("/notes", notesController.createNote);
app.get("/notes", notesController.fetchNotes);
app.get("/notes/:id", notesController.fetchNote);
app.put("/notes/:id", notesController.updateNote);
app.delete("/notes/:id", notesController.deleteNote);

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
