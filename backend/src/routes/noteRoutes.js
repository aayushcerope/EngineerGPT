import { Router } from 'express';
import { createNote, deleteNote, listNotes, updateNote } from '../controllers/noteController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.get('/', requireAuth, listNotes);
router.post('/', requireAuth, createNote);
router.patch('/:noteId', requireAuth, updateNote);
router.delete('/:noteId', requireAuth, deleteNote);

export default router;
