const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    std_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Standard'
    },
    sub_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject'
    },
    chapter_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chapter'
    },
    questions: [
        {
            question_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'question'
            },
            user_answer: {
                type: Number
            }
        }
    ],
    total_questions: {
        type: Number
    },
    total_right_answer: {
        type: Number
    },
    total_wronge_answer: {
        type: Number
    },
    submit_time: {
        type: Date,
        default: Date.now()
    }
})

const Result = mongoose.model('result', resultSchema)

module.exports = Result

