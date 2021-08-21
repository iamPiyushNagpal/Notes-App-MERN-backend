const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

router.post('/create-note', noteController.createNote);

router.delete('/delete-note', noteController.deleteNote);

router.get('/get-notes', noteController.getNotes);

router.get('/get-note', noteController.getNote);

router.patch('/update-note', noteController.updateNote);

module.exports = router;