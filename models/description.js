const mongoose = require('mongoose')
const Schema = mongoose.Schema

const descriptionSchema = new Schema( {
    description: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Description = mongoose.model('descriptions', descriptionSchema)
module.exports = Description