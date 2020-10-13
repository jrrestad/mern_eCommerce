const mongoose = require('mongoose');
const { ReplySchema } = require('./reply.nested.model')

const ConversationSchema = new mongoose.Schema({
    forId: {
        type: String,
        required: [true, "is required"]
    },
    fromId: {
        type: String,
        required: [true, "is required"]
    },
    message: {
        type: String,
        required: [true, "is required"],
        minlength: [10, "requires at least 10 characters"]
    },
    product: {
        type: String,
        required: [true, "is required"]
    },
    isRead: {
        type: Boolean,
    },
    replies: [ReplySchema]
}, {timestamps:true})

const Conversation = mongoose.model("Conversation", ConversationSchema)

module.exports = {
    Conversation
}