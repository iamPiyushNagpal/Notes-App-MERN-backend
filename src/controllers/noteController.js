const noteModel = require("../models/noteModel");

const createNote = async (req, res) => {
    try {
        const note = new noteModel({
            ...req.body,
            owner: req.user._id
        });
        await note.save();
        res.status(201).send({ note, message: "Note Created" });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
}

const deleteNote = async (req, res) => {
    try {
        const note = await noteModel.deleteOne({ _id: req.body.id });
        if (!note)
            return res.status(404).send({ message: "Note not found" });
        res.status(200).send({ message: "Note Deleted" });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
}

const updateNote = async (req, res) => {
    try {
        const note = await noteModel.findOneAndUpdate({ _id: req.body.id }, {
            title: req.body.title,
            description: req.body.description
        });
        await note.save();
        res.status(200).send({ message: "Note Updated" });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
}

const getNotes = async (req, res) => {
    try {
        const notes = await noteModel.find({ owner: req.user._id });
        res.status(200).send({ notes });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
}

const getNote = async (req, res) => {
    try {
        const note = await noteModel.findById(req.body.id);
        if (!note)
            return res.status(404).send({ message: "Note not found" });
        res.status(200).send({ note });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
}

module.exports = {
    createNote, getNotes, deleteNote, getNote, updateNote
}