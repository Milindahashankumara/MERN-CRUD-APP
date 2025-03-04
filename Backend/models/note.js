const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title2: String,
    body2: String,
    content2: String,
  });

  const Note = mongoose.model('Note', noteSchema);

  module.exports = Note;