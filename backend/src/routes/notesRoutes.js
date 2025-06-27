import express from 'express';
const router = express.Router();
import { getAllNotes,getNotesById,createNote,updateNote,deleteNote } from '../controllers/notesController.js';

router.get('/',getAllNotes);
router.get('/:id',getNotesById);
router.post('/',createNote)
router.put('/:id',updateNote)
router.delete('/:id',deleteNote);


export default router;