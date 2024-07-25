const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    std_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Standard'
    },
    subject_image: {
        type: String,
        required: true,
        trim: true
    }
})

const Subject = mongoose.model('subject', subjectSchema)

module.exports = Subject