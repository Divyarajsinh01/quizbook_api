const mongoose = require('mongoose')
const { trim } = require('validator')

const chapterSchema = new mongoose.Schema({
    chapter_number: {
        type: Number,
        required: true,
        trim: true
    },
    chapter: {
        type: String,
        required: true,
        trim: true
    },
    teacher_name: {
        type: String,
        required: true,
        trim: true
    },
    total_questions: {
        type: Number,
        required: true,
        trim: true
    },
    minutes: {
        type: String,
        required: true,
        trim: true
    },
    sub_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject'
    }
})

const Chapter = mongoose.model('chapter', chapterSchema)

module.exports = Chapter