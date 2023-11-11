
const db = require('../models/notes');

async function doesNoteExist(noteId) {
  const note = await db.getAllNotesById(noteId);
  return note.length > 0;
}

async function isNoteBelongsToUser(userId, noteId) {
  const note = await db.getNotesByUserIdAndId(userId, noteId);
  return note.length > 0;
}

function isContentValid(content) {
  return !content || content.length <= 200;
}

module.exports = {
  doesNoteExist,
  isNoteBelongsToUser,
  isContentValid,
};
