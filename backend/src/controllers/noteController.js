import Note from '../models/Note.js';

export const listNotes = async (req, res) => {
  const notes = await Note.find({ userId: req.user.id }).sort({ pinned: -1, updatedAt: -1 });
  res.json(notes);
};

export const createNote = async (req, res) => {
  const note = await Note.create({ ...req.body, userId: req.user.id });
  res.status(201).json(note);
};

export const updateNote = async (req, res) => {
  const note = await Note.findOneAndUpdate(
    { _id: req.params.noteId, userId: req.user.id },
    req.body,
    { new: true }
  );
  if (!note) return res.status(404).json({ message: 'Note not found' });
  return res.json(note);
};

export const deleteNote = async (req, res) => {
  const result = await Note.deleteOne({ _id: req.params.noteId, userId: req.user.id });
  if (!result.deletedCount) return res.status(404).json({ message: 'Note not found' });
  return res.status(204).send();
};
