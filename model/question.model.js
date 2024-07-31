const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    question_number: {
        type: Number,
        required: true,
        trim: true
    },
    question: {
        type: String,
        required: true,
        trim: true
    },
    option: {
        type: Array,
        required: true,
        trim: true
    },
    right_answer: {
        type: Number,
        required: true,
        trim: true,
    },
    chapter_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chapter'
    }
})

const Question = mongoose.model('question', questionSchema)

module.exports = Question

