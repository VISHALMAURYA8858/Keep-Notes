const express = require('express')
const Note = require('../models/note')

const router = new express.Router()

router.post('/notes', async (req, res) => {

    const note = new Note({
        heading: req.body.title,
        body: req.body.summary
    })

    try {
        await note.save()
        res.status(201).send(note)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/notes', async (req, res) => {


    const notes = await Note.find({})


    res.send(notes)
})

router.get('/notes/:id', async (req, res) => {
    const _id = req.params.id
    try {
        

        const note = await Note.findOne({ _id })

        if (!note) {
            return res.status(404).send()
        }

        res.send(note)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/notes/:id', async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id })

        if (!note) {
            return res.status(404).send()
        }

        res.send(note)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router