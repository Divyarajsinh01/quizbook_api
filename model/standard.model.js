const mongoose = require('mongoose')

const standardSchema = new mongoose.Schema({
    standard: {
        type: String,
        required: true
    }
})

const Standard = mongoose.model('Standard', standardSchema)

module.exports = Standard