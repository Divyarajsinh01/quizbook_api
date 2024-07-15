const mongoose = require('mongoose')

const standardSchema = new mongoose.Schema({
    std_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        unique: true
    },
    standard: {
        type: String,
        required: true
    }
})

const Standard = mongoose.model('Standard', standardSchema)

module.exports = Standard