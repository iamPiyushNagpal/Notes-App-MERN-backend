const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const passport = require('passport');

router.post('/create-note', passport.authenticate('jwt', { session: false }), noteController.createNote);

router.delete('/delete-note', passport.authenticate('jwt', { session: false }), noteController.deleteNote);

router.get('/get-notes', passport.authenticate('jwt', { session: false }), noteController.getNotes);

router.get('/get-note', passport.authenticate('jwt', { session: false }), noteController.getNote);

router.patch('/update-note', passport.authenticate('jwt', { session: false }), noteController.updateNote);

module.exports = router;