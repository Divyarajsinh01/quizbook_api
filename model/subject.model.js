const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    std_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Standard'
    }
})

const Subject = mongoose.model('subject', subjectSchema)

module.exports = Subject