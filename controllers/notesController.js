const express = require("express");
const router = express.Router();
const db = require("../models/notes");
const { verifyToken } = require("../middlewares/authMiddleware");
const { doesNoteExist, isNoteBelongsToUser } = require('../validations/noteValidations');

router.get("/", verifyToken, async (req, res) => {
  try {
    const userRole = req.user.role;
    const userId = req.user.userId;
    let notes;
    if (userRole === "ADMIN") {
      if (!req.body.userId) {
        notes = await db.getAllNotes();
      } else {
        notes = await db.getAllNotesByUserId(req.body.userId);
      }
      res.status(200).json({ notes });
    } else if (userRole === "USER") {
      notes = await db.getAllNotesByUserId(userId);
      res.status(200).json({ notes });
    } else {
      res.status(403).json({ error: "Unauthorized access" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", verifyToken, async (req, res) => {
  const { title, content, visibility } = req.body;
  try {
    if (content.length > 200) {
      return res
        .status(400)
        .json({ error: "Content length exceeded(Max 200 charcters)" });
    }
    if (visibility !== "0" && visibility !== "1") {
      return res
        .status(400)
        .json({ error: "Visibility can be 0(public) or 1(private)" });
    }
    const userId = req.user.userId;
    const note = {
      userId,
      title,
      content,
      visibility,
    };
    await db.createNote(note);
    return res.status(201).json({ success: "Note created successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/:id", verifyToken, async (req, res) => {
  const { title, content, visibility } = req.body;
  try {
    const userRole = req.user.role;
    const userId = req.user.userId;
    const noteId = req.params.id;
    if (userRole === "USER") {
      if (!(await isNoteBelongsToUser(userId, noteId))) {
        return res.status(400).json({ error: "No note with the Id" });
      }
    } else {
      if (!(await doesNoteExist(noteId))) {
        return res.status(400).json({ error: "No note with the Id" });
      }
    }
    if (content && content.length > 200) {
      return res
        .status(400)
        .json({ error: "Content length exceeded(Max 200 charcters)" });
    }
    const newNote = {
      title,
      content,
      visibility,
    };
    await db.updateNote(noteId, newNote);
    res.status(200).json({ success: "Note updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const userRole = req.user.role;
    const userId = req.user.userId;
    const noteId = req.params.id;
    if (userRole === "USER") {
      if (!(await isNoteBelongsToUser(userId, noteId))) {
        return res.status(400).json({ error: "No note with the Id" });
      }
    } else {
      if (!(await doesNoteExist(noteId))) {
        return res.status(400).json({ error: "No note with the Id" });
      }
    }
    await db.deleteNote(noteId);
    res.status(200).json({ success: "Note Deleted Successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
