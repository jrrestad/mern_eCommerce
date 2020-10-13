const { Conversation } = require('../models/conversation.model')

module.exports = {
    createConversation: (req, res) => {
        Conversation.create(req.body)
        .then(data => {res.json(data)})
        .catch(err => res.json(err))
    },
    getOne: (req, res) => {
        Conversation.find({ _id: req.params.id}).sort({ createdAt: -1})
        .then(data => res.json(data))
        .catch(err => res.json(err))
    },
    getAllSent: (req, res) => {
        Conversation.find({ fromId: req.params.fromId }).sort({ createdAt: -1})
        .then(data => res.json(data))
        .catch(err => res.json(err))
    },
    getAllReceived: (req, res) => {
        Conversation.find({ forId: req.params.forId }).sort({ createdAt: -1})
        .then(data => res.json(data))
        .catch(err => res.json(err))
    },
    createReply: (req, res) => {
        Conversation.findOneAndUpdate({ _id: req.params.id }, { $addToSet: { replies: req.body }}, { runValidators: true, new: true })
        .then(data => res.json(data))
        .catch(err => res.json(err))
    }
}