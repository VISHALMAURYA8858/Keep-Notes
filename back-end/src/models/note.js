const mongoose = require('mongoose')

const notechema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true
    },
})

const Note = new mongoose.model('Note', notechema)

module.exports = Note
