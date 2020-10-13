const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
    from: {
        type: String,
        required: [true, "is required"]
    },
    body: {
        type: String,
        require: [true, "is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = {
    ReplySchema
}